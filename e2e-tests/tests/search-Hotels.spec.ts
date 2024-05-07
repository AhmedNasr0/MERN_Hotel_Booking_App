import {test,expect} from '@playwright/test'
const UI_URL="http://localhost:5173/"
const email="ahmednasr7006@gmail.com"
const password="123456"

test.beforeEach(async ({page})=>{
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

test("User Should Search for a Hotel",async ({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going ?").fill("City")
    await page.getByRole("button",{name:"Search"}).click();
    await expect(page.getByText("City")).toBeVisible()
    await expect(page.getByText("Hotels found in City")).toBeVisible();
})

test("Should show Hotel Details",async ({page})=>{
    await page.goto(UI_URL);
  
    await page.getByPlaceholder("Where are you going ?").fill("City");
    await page.getByRole("button", { name: "Search" }).click();
  
    await page.getByText("Hotel Name").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
})