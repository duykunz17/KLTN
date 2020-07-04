const fs = require('fs');
const puppeteer = require("puppeteer");

var getPlaces = async (page) => {
    var places = await page.evaluate(() => {
        let items = document.querySelectorAll('.checkin');
        let place = [];
        items.forEach(item => {
            place.push({
                name: item.querySelector('div > a').innerText,
                url: item.querySelector('div > a').getAttribute('href') + '/diem-den',
                urlPlace: item.querySelector('div > a').getAttribute('href'),
                images: item.querySelector('img').src
            });
        });
        return place;
    });
    return places;
}

var getDescriptionPlace = async (page) => {
    var description = await page.evaluate(() => 
        document.querySelector("#page-index > div > div > div > div > p").innerText
    );
    return description;
}

var getDestination = async (page) => {
    var destination = await page.evaluate(() => {
        let listDes = document.querySelectorAll('.list-destination > div > div');
        const des = [];
        listDes.forEach(item => {
            des.push({
                images: item.querySelector('a > img').src,
                name: item.querySelector('div > a.fc-nineth').innerText,
                rating: item.querySelector('span.fc-nineth > span').innerText,
                review: item.querySelector('span > span.fc-primary').innerText,
                description: item.querySelector('a').getAttribute('href')
            });
        });
        return des;
    });
    return destination;
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://gody.vn/chau-a/viet-nam/tinh-thanh-pho");
    var places = await getPlaces(page);
    for (let place of places) {
        await page.goto(place.urlPlace);
        place.description = await getDescriptionPlace(page);

        /** handling get destination data of place */
        await page.goto(place.url);
        let destinations = await getDestination(page);
                
        place.destination = destinations;
        // console.log('>>>>>>>>>>>> '+ place.name + ' - ' + place.destination.length);
    }

    console.log('OK');
    fs.writeFileSync('./datas/place.json', JSON.stringify(places), 'utf8');

    await browser.close();
})();