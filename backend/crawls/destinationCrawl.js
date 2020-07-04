const fs = require('fs');
const puppeteer = require("puppeteer");

let data = JSON.parse(fs.readFileSync('./datas/place.json', 'utf8'));

const getDescriptionDes = async (page) => {
    var descriptionDes = await page.evaluate(() =>

        document.querySelector("#page-index > div > div > div > div > p").innerText
    );
    // console.log('=======> ' + descriptionDes);
    return descriptionDes;
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 19 - 22
    // 23 - 28
    // 29 - 30
    // 31 - 34
    // 35 - 37
    // 38 - 40
    // 41 - 44
    // 45 - 48
    // 49
    // 50 - 51
    // 52 - 54
    // 55 - 57
    // 58 - 60
    // 61 - 62
    for (let index = 62; index < 63; index++) {
        let destination = data[index].destination, count = 0;
        console.log(index + ' - ' + destination.length);
        for (let des of destination) {

            await page.goto(des.description);
            let description = await getDescriptionDes(page);
            des.description = description;

            // if (index != 18) {
            //     await page.goto(des.description);
            //     let description = await getDescriptionDes(page);
            //     des.description = description;
            // }
            // else {
            //     if (count < 25) {
            //         await page.goto(des.description);
            //         let description = await getDescriptionDes(page);
            //         des.description = description;
            //     }
            //     else
            //         des.description = '';
            // }

            // if (index == 29) {
            //     if (count > 38)
            //         des.description = '';
            //     else {
            //         await page.goto(des.description);
            //         let description = await getDescriptionDes(page);
            //         des.description = description;
            //     }
            // }
            // else {
            // await page.goto(des.description);
            // let description = await getDescriptionDes(page);
            // des.description = description;
            // }

            // if (index == 37) {
            //     if (count > 59)
            //         des.description = '';
            //     else {
            //         await page.goto(des.description);
            //         let description = await getDescriptionDes(page);
            //         des.description = description;
            //     }
            // }
            // else {
            // await page.goto(des.description);
            // let description = await getDescriptionDes(page);
            // des.description = description;
            // }

            // if (index == 49) {
            //     if (count > 72)
            //         des.description = '';
            //     else {
            //         await page.goto(des.description);
            //         let description = await getDescriptionDes(page);
            //         des.description = description;
            //     }
            // }

            // if (index == 57) {
            //     if (count > 26)
            //         des.description = '';
            //     else {
            //         await page.goto(des.description);
            //         let description = await getDescriptionDes(page);
            //         des.description = description;
            //     }
            // }
            // else {
            //     await page.goto(des.description);
            //     let description = await getDescriptionDes(page);
            //     des.description = description;
            // }

            // if (index == 49) {
            //     if (count > 72)
            //         des.description = '';
            //     else {
            //         await page.goto(des.description);
            //         let description = await getDescriptionDes(page);
            //         des.description = description;
            //     }
            // }

            count++;
            console.log(count);
        }
        data[index].destination = destination;
    }
    console.log('OK');
    fs.writeFileSync('./datas/place.json', JSON.stringify(data), 'utf8');

    await browser.close();
})();