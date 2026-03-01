const { $ } = require('@wdio/globals')
const Page = require('./page');


class LoginPage extends Page {
  
    get usernameInput() {
        return this.findByResourceId('com.yourapp:id/username');
    }

    get passwordInput() {
        return this.findByResourceId('com.yourapp:id/password');
    }

    get loginButton() {
        return this.findByResourceId('com.yourapp:id/login_button');
    }

    get forgotPasswordLink() {
        return this.findByText('Forgot Password?');
    }

    get signUpLink() {
        return this.findByText('Sign Up');
    }

    get errorMessage() {
        return this.findByResourceId('com.yourapp:id/error_message');
    }

    get rememberMeCheckbox() {
        return this.findByResourceId('com.yourapp:id/remember_me');
    }

    get showPasswordToggle() {
        return this.findByResourceId('com.yourapp:id/show_password');
    }

    
    async resolveUsernameInput() {
        const strategies = [
            () => this.findByResourceId('com.yourapp:id/username'),
            () => $('android=new UiSelector().className("android.widget.EditText").instance(0)'),
            () => this.findByPartialText('user'),
            () => this.findByPartialText('email'),
            () => this.findByContentDesc('Username'),
        ];
        return await this._resolveElement(strategies, 'username input');
    }

    
    async resolvePasswordInput() {
        const strategies = [
            () => this.findByResourceId('com.yourapp:id/password'),
            () => $('android=new UiSelector().className("android.widget.EditText").instance(1)'),
            () => this.findByPartialText('pass'),
            () => this.findByContentDesc('Password'),
        ];
        return await this._resolveElement(strategies, 'password input');
    }

    async getPrimaryLoginActionElement() {
        const strategies = [
            () => this.findByResourceId('com.yourapp:id/login_button'),
            () => this.findByText('Continue'),
            () => this.findByText('CONTINUE'),
            () => this.findByText('Login'),
            () => this.findByText('LOG IN'),
            () => this.findByText('Sign in'),
            () => this.findByText('SIGN IN'),
            () => $('android=new UiSelector().className("android.widget.Button").instance(0)'),
        ];
        return await this._resolveElement(strategies, 'login action');
    }

    
    async _resolveElement(strategies, name) {
        for (const strategy of strategies) {
            try {
                const el = await strategy();
                if (await el.isExisting()) {
                    return el;
                }
            } catch (e) {
                // try next strategy
            }
        }
        console.log(`Could not resolve ${name} with any strategy, returning first selector`);
        return await strategies[0]();
    }

    
    async enterUsername(username) {
        const el = await this.resolveUsernameInput();
        await this.setInputValue(el, username);
    }

    
    async enterPassword(password) {
        const el = await this.resolvePasswordInput();
        await this.setInputValue(el, password);
    }

   
    async clickLogin() {
        await this.hideKeyboard();
        await this.clickElement(this.loginButton);
    }

  
    async login(username, password, rememberMe = false) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        
        if (rememberMe) {
            await this.clickElement(this.rememberMeCheckbox);
        }
        
        await this.clickLogin();
    }

    
    async clickForgotPassword() {
        await this.clickElement(this.forgotPasswordLink);
    }

   
    async clickSignUp() {
        await this.clickElement(this.signUpLink);
    }

    async togglePasswordVisibility() {
        await this.clickElement(this.showPasswordToggle);
    }

   
    async getErrorMessage() {
        return await this.getElementText(this.errorMessage);
    }

    async isLoginPageDisplayed() {
        try {
            const el = await this.getPrimaryLoginActionElement();
            return await el.isDisplayed();
        } catch (e) {
            return false;
        }
    }

    
    async clearForm() {
        try {
            const usr = await this.resolveUsernameInput();
            const pwd = await this.resolvePasswordInput();
            if (await usr.isExisting()) await usr.clearValue();
            if (await pwd.isExisting()) await pwd.clearValue();
        } catch (e) {
            console.log('Could not clear form:', e.message);
        }
    }

   
    async isLoginButtonEnabled() {
        try {
            const el = await this.getPrimaryLoginActionElement();
            return await el.isEnabled();
        } catch (e) {
            return false;
        }
    }
}

module.exports = new LoginPage();
