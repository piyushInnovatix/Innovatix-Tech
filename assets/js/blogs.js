let blogImg = document.getElementById('blog-img')
let blogTitle = document.getElementById('blog-title')
let blogDes = document.getElementById('blog-des')
let blogImg1 = document.getElementById('img-1')
let blogImg2 = document.getElementById('img-2')
let blogImg3 = document.getElementById('img-3')
let blogPost1 = document.getElementById('post1')
let blogPost2 = document.getElementById('post2')
let blogPost3 = document.getElementById('post3')

document.addEventListener("DOMContentLoaded", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let pageId = urlParams.get("id")

    if (!pageId) {
        document.body.innerHTML = "<h2> This page doesn't exist</h2>";
        return
    }

    fetch('assets/js/json/blogs.json')
        .then(response => response.json())

        .then(data => {
            const pageData = data.pages[pageId];
            console.log("fetched");


            if (!pageData) {
                document.body.innerHTML = "<h2> This page doesn't exist</h2>";
                return;
            }

            blogTitle.textContent = pageData.title
            blogDes.textContent = pageData.description
            blogImg.src = pageData.img
            blogImg1.src = pageData.img1
            blogImg2.src = pageData.img2
            blogImg3.src = pageData.img3
            blogPost1.textContent = pageData.post1
            blogPost2.textContent = pageData.post2
            blogPost3.textContent = pageData.post3
        })

        .catch(err => console.log("error loading json")
        )
})