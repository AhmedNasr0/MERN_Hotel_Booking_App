import { test, expect } from '@playwright/test';
import path from 'path';
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

test("User Can Add Hotel",async ({page})=>{
    await page.goto(`${UI_URL}add-hotel`)
    await expect(page.getByText("Add Hotel")).toBeVisible();
    await page.locator('[name=name]').fill("name Test")
    await page.locator('[name=city]').fill("City Test")
    await page.locator('[name=country]').fill("Country Test")
    await page.locator('[name=description]').fill("desc Test")
    await page.locator('[name=pricePerNight]').fill("100")
    await page.selectOption('select[name="starRating"]',"4")
    await page.getByText("Motel").click();
    await page.getByLabel("Parking").check();
    await page.getByLabel("Free Wifi").check()
    await page.locator('[name=adultCount]').fill("2")
    await page.locator('[name=childCount]').fill("3")
    await page.locator('[name=adultCount]').fill("2")

    await page.setInputFiles('[name="images"]',[
        path.join(__dirname,"files","1.png"),
        path.join(__dirname,"files","2.png")
    ])
    await page.getByRole('button',{name:"Save"}).click()
    await expect(page.getByText("Hotel Saved!")).toBeVisible({timeout:30000})
})

test("User Should see His Posted Hotels",async({page})=>{
    await page.goto(`${UI_URL}my-hotels`)
    await expect(page.getByText("My Hotels")).toBeVisible()
    await expect(page.getByRole('link',{name:"Add Hotel"})).toBeVisible();
    await expect(page.getByText("Hotel Name").first()).toBeVisible();
    await expect(page.getByText("City, Country").first()).toBeVisible();
    await expect(page.getByText("Hotel Description").first()).toBeVisible();
    await expect(page.getByText("Budget").first()).toBeVisible();
    await expect(page.getByText("£100 per night").first()).toBeVisible();
    await expect(page.getByText("1 adults, 1 children").first()).toBeVisible();
    await expect(page.getByText("5 Star Rating").first()).toBeVisible();
    await expect(page.getByRole('link',{name:"View Details"}).first()).toBeVisible()
})

test("user Can update his hotel and Show the updated hotel",async({page})=>{
    await page.goto(`${UI_URL}my-hotels`)
    await page.getByRole('link',{name:"View Details"}).first().click();
    await page.waitForSelector('[name="name"]',{state:"attached"});

    await expect(page.getByText('name').first()).toHaveValue("Hotel Name")
    await page.locator('[name="name"]').first().fill("Hotel Name Update")
    await page.getByRole('button',{name:"Update"}).click();
    await expect(page.getByText("Hotel Upated Suuccessfully")).toBeVisible();
    await page.reload()
    await expect(page.locator('[name="name"]').first()).toHaveValue("Hotel Name Update");

    await page.locator('[name="name"]').first().fill("Hotel Name")
    await page.getByRole('button',{name:"Update"}).click();

})