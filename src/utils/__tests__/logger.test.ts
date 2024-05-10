import { logger } from '../logger';

describe('Logger', () => {
  it('should log a message', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const message = 'Hello World';
    logger.log(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should log an error', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const message = 'Hello World';
    logger.error(message);
    expect(errorSpy).toHaveBeenCalledWith(message);
  });

  it('should log a warning', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const message = 'Hello World';
    logger.warn(message);
    expect(warnSpy).toHaveBeenCalledWith(message);
  });

  it('should log a debug message', () => {
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
    const message = 'Hello World';
    logger.debug(message);
    expect(debugSpy).toHaveBeenCalledWith(message);
  });

  it('should log an info message', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const message = 'Hello World';
    logger.info(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should log a message with multiple arguments', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const message = 'Hello';
    const message2 = 'World';
    logger.log(message, message2);
    expect(logSpy).toHaveBeenCalledWith(message, message2);
  });

  it('should log an error with multiple arguments', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const message = 'Hello';
    const message2 = 'World';
    logger.error(message, message2);
    expect(errorSpy).toHaveBeenCalledWith(message, message2);
  });

  it('should log a warning with multiple arguments', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const message = 'Hello';
    const message2 = 'World';
    logger.warn(message, message2);
    expect(warnSpy).toHaveBeenCalledWith(message, message2);
  });

  it('should log a debug message with multiple arguments', () => {
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
    const message = 'Hello';
    const message2 = 'World';
    logger.debug(message, message2);
    expect(debugSpy).toHaveBeenCalledWith(message, message2);
  });

  it('should log an info message with multiple arguments', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const message = 'Hello';
    const message2 = 'World';
    logger.info(message, message2);
    expect(logSpy).toHaveBeenCalledWith(message, message2);
  });

  it('should log a message with an object', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const message = { message: 'Hello World' };
    logger.log(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should log an error with an object', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const message = { message: 'Hello World' };
    logger.error(message);
    expect(errorSpy).toHaveBeenCalledWith(message);
  });

  it('should log a warning with an object', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const message = { message: 'Hello World' };
    logger.warn(message);
    expect(warnSpy).toHaveBeenCalledWith(message);
  });

  it('should log a debug message with an object', () => {
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
    const message = { message: 'Hello World' };
    logger.debug(message);
    expect(debugSpy).toHaveBeenCalledWith(message);
  });

  it('should log an info message with an object', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const message = { message: 'Hello World' };
    logger.info(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });
});
