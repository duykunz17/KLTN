const puppeteer = require("puppeteer");
const dbPlace = require('../models/Place');

const getPlaces = async (page) => {
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

const getDestination = async (page) => {
    var destination = await page.evaluate(() => {
        let listDes = document.querySelectorAll('.list-destination > div > div');
        const des = [];
        listDes.forEach(item => {
          let images = item.querySelector('a > img').src;
          let name = item.querySelector('div > a.fc-nineth').innerText;
          let rating = item.querySelector('span.fc-nineth > span').innerText;
          let review = item.querySelector('span > span.fc-primary').innerText;
          let url = item.querySelector('a').getAttribute('href');
          des.push({
            images: images,
            name: name,
            rating: rating,
            review: review,
            description: url
          });
        });  
        return des;
      });
    return destination;
}

const getDescriptionPlace = async (page) => {
    var description = await page.evaluate(() => {
        document.querySelector("#page-index > div > div > div > div > p").innerText;
    });
    return description;
}

const getDescriptionDes = async (page) => {
    var descriptionDes = await page.evaluate(() => {
        document.querySelector("#page-index > div > div > div > div > p").innerText;
    });
    return descriptionDes;
}

const pushPlace = (place) => {
  
  
}

const pushDestination = async (place) => {
  await dbPlace.updateOne({_id: place._id}, {$push: {destination: place.destination}})
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://gody.vn/chau-a/viet-nam/tinh-thanh-pho");
    var places = await getPlaces(page);
    for (let place of places) {
          await page.goto(place.urlPlace);
          place.description = await getDescriptionPlace(page);
          
          await page.goto(place.url);
          let destinations = await getDestination(page);
          place.destination = [];
          for (let destination of destinations){
              await page.goto(destination.description);
              destination.description = await getDescriptionDes(page);
              place.destination.push(destination);
              console.log('>>>>>>>>>>>>')
              dbPlace.insertMany({
                name: place.name,
                area: '',
                images: place.images,
                description: place.description,
                destination: place.destination
              })
          }
          //await pushDestination(place);
         

        
    }
    await browser.close();
})();
