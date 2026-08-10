const { chromium } = require('playwright');
const path = require('path');
(async()=>{
 const dir=__dirname;
 const browser=await chromium.launch({executablePath:'C:/Users/Vladislav/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 await page.goto('file:///'+path.join(dir,'deck.html').replace(/\\/g,'/'));
 await page.pdf({path:path.join(dir,'..','КП_Ottobock_AIR_v1.pdf'),width:'1280px',height:'720px',printBackground:true,margin:{top:0,bottom:0,left:0,right:0}});
 await browser.close();
 console.log('PDF generated');
})();
