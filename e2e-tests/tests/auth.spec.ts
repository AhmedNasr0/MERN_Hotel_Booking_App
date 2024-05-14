import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"
const email="ahmednasr@gmail.com"
const password="123456"
test("should allow the user to sign in",async ({page})=>{
  await page.goto(UI_URL);
  // get the sign in button 
  await page.getByRole("link",{name:"Sign In"}).click();

  await page.locator("[name=email]").fill(email)
  await page.locator("[name=password]").fill(password);

  await page.getByRole("button",{name:"Login"}).click();

  await expect(page.getByText(`welcome ${email}`)).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible();
})

const createEmail=()=>{
  let email=`test_email${Math.floor(Math.random()*90000)+10000}@test.com`
  return email 
}
test("should allow user to register",async({page})=>{
  page.goto(UI_URL)
  await page.getByRole("link",{name:"Sign In"}).click()
  await page.getByRole("link",{name:"Create Account"}).click()
  await expect(page.getByText("Create an Account")).toBeVisible()
  // fill data
  await page.locator("[name=firstName]").fill("testFN")
  await page.locator("[name=lastName]").fill("testLN")
  await page.locator("[name=email]").fill(createEmail() as string)
  await page.locator("[name=password]").fill("123456")
  await page.locator("[name=confirmPassword]").fill("123456")

  await page.getByRole("button",{name:"Create Account"}).click()

  await expect(page.getByText("User Succssesfully Sign Up")).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible();
})
test("should allow user to SignOut",async({page})=>{
  //login first
  await page.goto(UI_URL);
  // get the sign in button 
  await page.getByRole("link",{name:"Sign In"}).click();

  await page.locator("[name=email]").fill(email)
  await page.locator("[name=password]").fill(password);

  await page.getByRole("button",{name:"Login"}).click();

  await expect(page.getByText(`welcome ${email}`)).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible();

  // SignOut 
  await page.getByRole('button',{name:"SignOut"}).click()
  await expect(page.getByText("SignOut Successfully")).toBeVisible()
  await expect(page.getByRole("link",{name:"Sign In"})).toBeVisible();
})