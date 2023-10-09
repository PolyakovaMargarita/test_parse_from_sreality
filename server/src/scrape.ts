import puppeteer from 'puppeteer';

interface ExtractedData {
  imageSrc: string;
  title: string;
}

export default async function(){
  (async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox']});
    const page = await browser.newPage();
    let pageNum = 1;
    const data: ExtractedData[] = [];
    const needItems = 30;

    while (data.length < needItems) {
      await page.goto(`${process.env.BASE_URL}/search/for-sale/apartments?pade=${pageNum}`);
      console.log("data.length", data.length)

      const divs = await page.$$('div.property');

      for (const div of divs) {
        const item: ExtractedData = {
          imageSrc: "",
          title: ""
        };
    
        // Проверяем, есть ли внутри div элемент <span>
        const hasSpanInsideLink = await div.$eval('a img', (span) => span !== null);
    
        const titleText = await div.$eval('a.title span', (a) => a.textContent || '');
        item.title = titleText;
    
        console.log("hasSpanInsideLink", hasSpanInsideLink)
    
        if (!hasSpanInsideLink) {
          // Если элемент <span> отсутствует, извлекаем ссылку на первую картинку
          const imageSrc = await div.$eval('a:first-child img', (img) => img.getAttribute('src') || '');
          item.imageSrc = imageSrc;
    
        } else {
          // Если элемент <span> есть, извлекаем ссылку на следующую картинку
          const imageSrc = await div.$eval('a:nth-child(2) img', (img) => img.getAttribute('src') || '');
          item.imageSrc = imageSrc;
        }
        pageNum++;
        data.length < needItems && data.push(item);
        
      }

    }

    console.log('Извлеченные данные:', data.length);

    await browser.close();
})();
}




// export default async function(){


// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(`${BASE_URL}/search/for-sale/apartments`);

//   // Используем метод page.$$eval() для извлечения текста из всех элементов <h2> на странице
//   // const h2Elements: string[] = await page.$$eval('h2', (elements) => {
//   //   return elements.map((element) => element.textContent || '');
//   // });

//     // Извлекаем ссылки на изображения с помощью page.$$eval()
//     const imageLinks: string[] = await page.$$eval('img', (images) => {
//       return images.map((img) => img.getAttribute('src') || '');
//     });

//   console.log('Текст из всех элементов <h2>:', imageLinks);

//   await browser.close();
// })();

// }

// export default async function scrapeSReality() {
//   const scrapedData: ScrapedItem[] = [];
//   console.log("totalCount");
//   try {
//     let page = 1;
//     let totalCount = 0;

//     while (totalCount === 0) {
//       const response = await axios.get(`${BASE_URL}/search/`);
//       console.log("________________________", response);
//       const $ = cheerio.load(response.data);
    
//       // Ищем все элементы <h2> с классом "title"
//       const elements = $('h1.page-title');

//       // console.log("elements",      elements.each((index, element) => {
//       //   const textContent = $(element).text();
//       //   console.log(`Element ${index + 1}: ${textContent}`);
//       // }))

//       elements.each((index, element) => {
//         const textContent = $(element).text();
//         console.log(`Element ${index + 1}: ${textContent}`);
//       });
    
//       // elements.each((index, element) => {
//       //   const title = $(element).text().trim();
//       //   const imageUrl = $(element).attr('data-img-src');
    
//       //   if (title && imageUrl) {
//       //     scrapedData.push({ title, imageUrl });
//       //     totalCount++;
//       //   }
//       // });
    
//       // Проверяем, есть ли следующая страница результатов
//       const nextPageButton = $('.next-page');
//       if (nextPageButton.length === 0) {
//         // Нет следующей страницы, выходим из цикла
//         break;
//       } else {
//         // Нажимаем кнопку "Next" (псевдокод, реальная реализация может отличаться)
//         // await goToNextPage(); // Здесь нужно реализовать функцию перехода на следующую страницу
//       }
//     }

//     console.log(scrapedData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };