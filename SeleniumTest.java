import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumTest {
    public static void main(String[] args) {
        // 🔧 Update the path below to your chromedriver.exe
        System.setProperty("webdriver.chrome.driver", "C:/path/to/chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        try {
            // ✅ Step 1: Open the app
            driver.get("http://localhost:5173");

            // ✅ Step 2: Check initial counter value
            String initial = driver.findElement(By.id("output")).getText();
            System.out.println("Initial value: " + initial);
            if (!initial.equals("0")) {
                System.out.println("❌ Test failed: Expected 0 at start");
                return;
            }

            // ✅ Step 3: Click increment once
            WebElement button = driver.findElement(By.id("increment-button"));
            button.click();

            String afterFirstClick = driver.findElement(By.id("output")).getText();
            System.out.println("After 1 click: " + afterFirstClick);
            if (!afterFirstClick.equals("1")) {
                System.out.println("❌ Test failed: Expected 1 after one click");
                return;
            }

            // ✅ Step 4: Click increment 2 more times (total 3)
            button.click(); // 2
            button.click(); // 3

            String afterThreeClicks = driver.findElement(By.id("output")).getText();
            System.out.println("After 3 total clicks: " + afterThreeClicks);
            if (!afterThreeClicks.equals("3")) {
                System.out.println("❌ Test failed: Expected 3 after three clicks");
                return;
            }

            // ✅ Step 5: Refresh page and verify reset (if applicable)
            driver.navigate().refresh();
            Thread.sleep(1000); // wait for DOM to load
            String afterRefresh = driver.findElement(By.id("output")).getText();
            System.out.println("After refresh: " + afterRefresh);
            if (!afterRefresh.equals("0")) {
                System.out.println("❌ Test failed: Expected 0 after refresh");
            } else {
                System.out.println("✅ Page reset test passed!");
            }

            // ✅ Step 6: Confirm button is still clickable
            driver.findElement(By.id("increment-button")).click();
            String afterClickAgain = driver.findElement(By.id("output")).getText();
            System.out.println("After click after refresh: " + afterClickAgain);
            if (afterClickAgain.equals("1")) {
                System.out.println("✅ Button still works after refresh");
            } else {
                System.out.println("❌ Button didn’t work after refresh");
            }

            System.out.println("✅ All tests completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
