
import { $, expect } from "@wdio/globals";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MediPage extends Page {
  /**
   * define selectors using getter methods
   */

  public get bypassUrl() {
    return "https://dev.mediboard.ai/access/bypass-sms";
  }

  public get emailInput() {
    return $("#email");
  }

  public get passwordInput() {
    return $("#password");
  }

  public get btnSubmit() {
    return $("div > div > button");
  }

  public get checkBox1() {
    return $(
      "div.ant-modal-content > div > div > div > div:nth-of-type(1) input"
     // "div.ant-modal-content > div > div > div > div:nth-of-type(1) input"
    );
  }

  public get checkBox2() {
    return $(
      "div.ant-modal-content > div > div > div > div:nth-of-type(2) input"
    );
  }

  public get checkBoxSubmitBtn() {
    return $("div.justify-center span");
  }

  public get generalOverview(){
    return $('aria/General Overview[role="heading"]')
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  public async login(username: string, password: string) {
    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.btnSubmit.click();
  }

  async agreeToTerms() {
    await this.checkBox1.click();
    await this.checkBox2.click();
    await this.checkBoxSubmitBtn.click();
  }

  async verifyUrl() {
    await expect(browser).toHaveUrl(this.bypassUrl);
  }

  async verifyOtp() {
    await browser.$("div:nth-of-type(4) div:nth-of-type(1) > input").click();
    await browser
      .$("div:nth-of-type(4) div:nth-of-type(1) > input")
      .setValue("1");
    await browser.$("div:nth-of-type(2) > input").setValue("1");
    await browser.$("div:nth-of-type(3) > input").setValue("1");
    await browser.$("div:nth-of-type(4) > input").setValue("1");
    await browser.$("div:nth-of-type(5) > input").setValue("1");
    await browser.$("div.bg-\\[\\#EFF6FF\\]").click();
  }


 public async getGeneralOverviewText(){
    expect(this.generalOverview).toHaveText('General Overview')
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  // async open() {
  //     await browser.url(this.bypassUrl);
  // }

  public open() {
    return super.open("access/bypass-sms");
  }
}

export default new MediPage();
