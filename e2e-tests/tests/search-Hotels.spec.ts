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

test("User should book hotel",async({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going ?").fill("City");

    const date=new Date();
    date.setDate(date.getDate()+3);
    const formatedDate=date.toISOString().split('T')[0];
    
    await page.getByPlaceholder("Check-out Date").fill(formatedDate);


    await page.getByRole("button", { name: "Search" }).click();
    await page.getByText("Hotel Name").click();

    await page.getByRole("button", { name: "Book now" }).click()

    await expect(page.getByText("Total Cost: £300.00")).toBeVisible({timeout:5000})
    const stripeFrame=page.frameLocator("iframe").first();
    await stripeFrame.locator('[placeholder="Card number"]').fill("4242 4242 4242 4242")
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("5/28");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24222");
    await page.getByRole("button",{name:"Confirm Booking"}).click();

    await expect(page.getByText("Booking Saved!")).toBeVisible({timeout:50000});

})