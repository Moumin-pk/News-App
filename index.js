const API_KEY = '0d925938d41645198f302c0161d24ace';
 const url = 'https://newsapi.org/v2/everything?q='

 function reload(){
    window.location.reload()
 }

 window.addEventListener('load', () => fetchNews('Pakistan'))

 async function fetchNews(elem){
    console.log(elem);
    const res = await fetch(`${url}${elem}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data.articles);
    bindData(data.articles)
 }

 function bindData(articles){
    const cardsContainer =    document.getElementById('cards-container')
    const newsCardTemplete = document.getElementById('template-news-card')

    cardsContainer.innerHTML =''; // empty

    articles.forEach( article => {
        console.log(article.urlToImage);
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplete.content.cloneNode(true); // access all element 
        console.log(cardClone);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone)
    });
 }

function fillDataInCard(cardClone,article){
const newsImage = cardClone.querySelector('#news-img')
const newstitle = cardClone.querySelector('#news-title')
const newsSource = cardClone.querySelector('#news-source')
const newsDescription= cardClone.querySelector('#news-desc')
const date = new Date(article.publishedAt).toLocaleString('en-US', { timeZone: 'Asia/Karachi' });

newsImage.src =  article.urlToImage;
newstitle.innerHTML = article.title;
newsSource.innerHTML = `${article.source.name} : ${date}`
newsDescription.innerHTML = article.description

cardClone.firstElementChild.addEventListener('click', () => {
     window.open(article.url,'_blank')
});
}
let curselectedNav = null;
function NavItemClick(id){
    fetchNews(id);
const navItem = document.getElementById(id)
console.log(navItem);
curselectedNav?.classList.remove('active')
curselectedNav = navItem;
curselectedNav.classList.add('active')
}

const searchbutton = document.getElementById('search-button')
const searchinput = document.getElementById('news-input')
searchbutton.addEventListener('click',() => {
  const  query =  searchinput.value
  fetchNews(query)
  curselectedNav?.classList.remove('active')
  curselectedNav = null;
})

