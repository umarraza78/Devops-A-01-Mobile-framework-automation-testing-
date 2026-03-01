describe('Android app launch', () => {
    it('should start a session and load app capabilities', async () => {
        const caps = await driver.getCapabilities()
        await expect(caps.get('platformName')).toBeDefined()
    })
})
