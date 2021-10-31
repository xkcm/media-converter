const logger = require('../src/logger')

describe("Local logger unit tests", () => {
  const spiedLog = jest.spyOn(console, 'log')
  spiedLog.mockImplementation(() => {}) 
  it('should log properly to the console', () => {
    const message = "s0m3t35t"
    const label = "s0m3l4b3l"
    logger.info(label, message)
    expect(spiedLog).toHaveBeenCalled()
    expect(spiedLog).toHaveBeenCalledWith(expect.stringContaining(message))
    expect(spiedLog).toHaveBeenCalledWith(expect.stringContaining(label))
  })
  it('should log proper level', () => {
    logger.info()
    expect(spiedLog).toHaveBeenCalledWith(expect.stringContaining("info"))
    logger.warning()
    expect(spiedLog).toHaveBeenCalledWith(expect.stringContaining("warning"))
    logger.success()
    expect(spiedLog).toHaveBeenCalledWith(expect.stringContaining("success"))
    logger.error()
    expect(spiedLog).toHaveBeenCalledWith(expect.stringContaining("error"))
  })
})