'use client';

import AOS from 'aos';
import Image from 'next/image';
import { useEffect } from 'react';

import { useEventListener } from '@/hooks';
import AlertLevel from '@/types/alert-level-enum';

import Button from '../button';
import CloseButton from '../close-button';
import 'aos/dist/aos.css';

type ModalAlertProps = {
  title: string;
  description: string;
  primaryActionButtonText?: string;
  onPrimaryAction?: () => void;
  secondaryActionButtonText?: string;
  onSecondaryAction?: () => void;
  onDismiss: () => void;
  type: AlertLevel;
};

export default function ModalAlert(props: ModalAlertProps) {
  const {
    title,
    description,
    primaryActionButtonText,
    onPrimaryAction,
    secondaryActionButtonText,
    onSecondaryAction,
    onDismiss,
    type,
  } = props;

  useEffect(() => {
    AOS.init();
  }, []);

  useEventListener('keydown', (e: any) => {
    if (e.key === 'Escape') onDismiss();
  });

  const getAlertIcon = () => {
    switch (type) {
      case AlertLevel.SUCCESS:
        return '/icons/modal-alert/check_circle_white.svg';
      case AlertLevel.ERROR:
        return '/icons/modal-alert/cancel_white.svg';
      case AlertLevel.WARNING:
        return '/icons/modal-alert/error_white.svg';
      case AlertLevel.INFO:
        return '/icons/modal-alert/info_white.svg';
    }
  };

  return (
    <div
      onClick={onDismiss}
      className='fixed bottom-0 left-0 right-0 top-0 z-[10] flex items-center justify-center bg-black bg-opacity-30'
    >
      <div
        data-aos='zoom-in'
        onClick={(e) => e.stopPropagation()}
        className='relative mx-[12px] flex aspect-[9/10] w-[400px] flex-col overflow-hidden rounded-[8px] bg-primary leading-[1.2]'
      >
        <div className='flex h-[45%] items-center justify-center'>
          <Image
            src={getAlertIcon()}
            alt='alert-icon'
            width={0}
            height={0}
            className='h-auto w-[120px]'
          />
        </div>
        <div className='flex flex-grow flex-col items-center justify-center bg-white p-[24px] text-primary'>
          <h4 className='mb-[12px] text-[32px] font-[700]'>{title}</h4>
          <p className='mb-[24px] text-center text-[18px]'>{description}</p>
          <div className='flex w-[100%] justify-center'>
            {primaryActionButtonText && onPrimaryAction && (
              <Button onClick={onPrimaryAction}>
                <p className='text-[18px]'>{primaryActionButtonText}</p>
              </Button>
            )}
            {primaryActionButtonText &&
              onPrimaryAction &&
              secondaryActionButtonText &&
              onSecondaryAction && <div className='w-[16px]'></div>}
            {secondaryActionButtonText && onSecondaryAction && (
              <Button onClick={onSecondaryAction} type='neutral'>
                <p className='text-[18px]'>{secondaryActionButtonText}</p>
              </Button>
            )}
          </div>
        </div>
        <CloseButton
          className='absolute right-[12px] top-[12px] z-[10] md:right-[16px] md:top-[16px]'
          onClick={onDismiss}
        />
      </div>
    </div>
  );
}
