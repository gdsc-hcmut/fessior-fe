#!/bin/bash

export "$(grep -vE "^(#.*|\s*)$" ./scripts/.env)"

API_KEY="$TINYPNG_API_KEY"
RAW_DIR="$PWD/raw"
OUTPUT_IMG_DIR="$PWD/src/assets/img"
OUTPUT_SVG_DIR="$PWD/src/assets/svg"
ASSETS_FILE="$PWD/src/assets/index.ts"

if [ -z "$API_KEY" ]; then
  echo "Please set your TinyPNG API key."
  exit 1
fi

if [ ! -d "$RAW_DIR" ]; then
  echo "Directory not found!"
  exit 1
fi

handle_api_errors() {
  local status=$1

  case $status in
    401)
      echo "Error: API key is invalid."
      exit 1
      ;;
    429)
      echo "Error: Too many requests. Please try again later."
      exit 1
      ;;
    *)
      echo "Error: Unexpected HTTP status code $status."
      ;;
  esac

  exit 1
}

modified_images=$(find "$RAW_DIR" -type f \( -exec test -n "$(git status --porcelain {} 2>/dev/null)" \; -o -print \))

# Iterate through each PNG, JPG, and SVG file in the directory
for file in $modified_images; do
  if [ -f "$file" ]; then
    base_name=$(basename "$file")
    base_name_no_ext="${base_name%.*}"

    if [[ "$base_name" == ".gitkeep" ]]; then
      continue
    fi

    echo "Processing $base_name..."

    if [[ ! "$base_name_no_ext" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
      echo "File \"$base_name\" is not kebab-case."
      echo "--------------------\n"
      continue
    fi

    extension="${file##*.}"
    if [ "$extension" = "svg" ]; then
      if [ ! -f "$OUTPUT_SVG_DIR/$base_name" ]; then
        cp "$file" "$OUTPUT_SVG_DIR/$base_name"
      fi
    elif [ "$extension" = "png" ] || [ "$extension" = "jpg" ] || [ "$extension" = "jpeg" ]; then
      if [ ! -f "$OUTPUT_IMG_DIR/$base_name" ]; then
        echo "Tinifying $file..."

        response=$(curl --user api:"$API_KEY" \
                        --data-binary "@$file" \
                        --url "https://api.tinify.com/shrink" \
                        --include \
                        --silent)

        status_code=$(echo "$response" | head -n1 | cut -d' ' -f2)

        if [ "$status_code" != "201" ]; then
          handle_api_errors "$status_code"
        fi

        tinified_url=$(echo "$response" | grep -i '^Location:' | awk '{print $2}' | tr -d '\r\n')

        curl --url "$tinified_url" --output "$OUTPUT_IMG_DIR/$(basename "$file").tmp" --silent

        mv "$OUTPUT_IMG_DIR/$(basename "$file").tmp" "$OUTPUT_IMG_DIR/$(basename "$file")"
      fi
    fi

    echo "File \"$base_name\" has been processed."
    echo "--------------------\n"
  fi
done

kebab_to_camel() {
  echo $1 | perl -pe 's/(^|-)(\w)/\U$2/g'
}

added_images=$(find "$OUTPUT_IMG_DIR" -type f)
added_svgs=$(find "$OUTPUT_SVG_DIR" -type f)

if [ ! -f "$ASSETS_FILE" ]; then
  touch "$ASSETS_FILE"
fi

echo "export const images = {" > "$ASSETS_FILE"

for file in $added_images; do
  base_name=$(basename "$file")
  base_name_no_ext="${base_name%.*}"

  if [[ "$base_name" == ".gitkeep" ]]; then
    continue
  fi

  echo "  $(kebab_to_camel "$base_name_no_ext") : require('./img/$base_name')," >> "$ASSETS_FILE"
done

echo "};\n" >> "$ASSETS_FILE"

echo "export const svgs = {" >> "$ASSETS_FILE"

for file in $added_svgs; do
  base_name=$(basename "$file")
  base_name_no_ext="${base_name%.*}"

  if [[ "$base_name" == ".gitkeep" ]]; then
    continue
  fi

  echo "  $(kebab_to_camel "$base_name_no_ext") : require('./svg/$base_name')," >> "$ASSETS_FILE"
done

echo "};\n" >> "$ASSETS_FILE"

echo "All assets have been processed."