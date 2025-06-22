// declare variables
const nameInput = document.getElementById("title")
const category = document.getElementById("category")
const image= document.getElementById("image")
const authorInput = document.getElementById("author")
const content = document.getElementById("blogContent")
const date = document.getElementById("date")
//  create card
function createCard(transport) {
    return`
    <div style="background:rgba(245, 245, 245, 0.541):padding:24px;border:1px solid #eee;box-shadow:0 2px 4px rgba(0,0,0,0.08);margin-bottom:16px;transition:all 0.3s ease;">
    <h3 style="font-size:1.25rem;font-weight:600;color:#000004;margin-bottom:8px;"> ${transport.title}</h3>
    <h2 style="font-size:1rem;font-weight:500;color:#000004;margin-botton:10px;">${transport.category}
    <img src="${transport.image}" alt="${transport.title}" width="300">
    <h3 style="font-size:1rem;font-weight:600;color:#000004;margin-bottom:8px;"> ${transport.author}</h3>
    <p style="font-size:1rem;, color:#000004;">${transport.content}</p>
    <h3 style="font-size:1rem;font-weight:600;color:#000004;margin-bottom:8px;"> ${transport.date}</h3>

    
    `
    
}