// Select form inputs
const form = document.getElementById("myForm");
const blogs = document.getElementById("blogs");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("image");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("blogContent");
const dateInput = document.getElementById("date");

let updateId = null;

// Create blog card
function createCard(blog) {
  return `
    <div class="blog-card" data-id="${blog.id}" style="background:rgba(245, 245, 245, 0.541); padding:24px; border:1px solid #eee; box-shadow:5px 5px 9px rgba(0,0,0,0.08); margin-bottom:16px;">
      <h3>${blog.title}</h3>
      <h4>${blog.category}</h4>
      <img src="${blog.image}" alt="${blog.title}" width="260px" style="display:block; margin:10px 0;">
      <h4>By ${blog.author}</h4>
      <p>${blog.content}</p>
      <h5>Published: ${blog.date}</h5>
      <button class="delete" data-id="${blog.id}" style="background:#FF0000; color:#fff; padding:8px 12px; border:none; border-radius:4px; cursor:pointer; margin-right:10px;">
        <i class="fi fi-sr-trash"></i> Delete
      </button>
      <button class="update" data-id="${blog.id}" style="background:#1efb03; color:#000; padding:8px 12px; border:none; border-radius:4px; cursor:pointer;">
        <i class="fi fi-sr-rotate-square"></i> Update
      </button>
    </div>
  `;
}

// Fetch and display all blogs
function fetchBlogs() {
  fetch("https://json-server-5t30.onrender.com/transport")
    .then(res => res.json())
    .then(data => {
      blogs.innerHTML = "";
      data.forEach(blog => {
        blogs.innerHTML += createCard(blog);
      });
    })
    .catch(err => console.error("Fetch error:", err));
}

// Handle blog form submission
function setupPostHandler() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const blogData = {
      title: titleInput.value,
      category: categoryInput.value,
      image: imageInput.value,
      author: authorInput.value,
      content: contentInput.value,
      date: dateInput.value,
    };

    fetch("https://json-server-5t30.onrender.com/transport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    })
      .then(res => res.json())
      .then(data => {
        blogs.innerHTML += createCard(data);
        form.reset();
      })
      .catch(err => console.error("POST error:", err));
  });
}

// Handle delete and update button clicks
function setupBlogInteraction() {
  blogs.addEventListener("click", (e) => {
    const blogId = e.target.closest("button")?.dataset.id;

    // DELETE
    if (e.target.closest(".delete")) {
      const confirmDelete = confirm("Are you sure you want to delete this blog?");
      if (!confirmDelete) return;

      fetch(`https://json-server-5t30.onrender.com/transport/${blogId}`, {
        method: "DELETE",
      })
        .then(() => fetchBlogs())
        .catch(err => console.error("Delete error:", err));
    }

    // UPDATE
    if (e.target.closest(".update")) {
      fetch(`https://json-server-5t30.onrender.com/transport/${blogId}`)
        .then(res => res.json())
        .then(data => {
          titleInput.value = data.title;
          categoryInput.value = data.category;
          imageInput.value = data.image;
          authorInput.value = data.author;
          contentInput.value = data.content;
          dateInput.value = data.date;

          updateId = blogId;
          addUpdateButton();
          window.scrollTo({ top: form.offsetTop, behavior: "smooth" });
        });
    }
  });
}

// Add confirm update button
function addUpdateButton() {
  if (document.getElementById("confirmUpdate")) return;

  const updateBtn = document.createElement("button");
  updateBtn.id = "confirmUpdate";
  updateBtn.textContent = "Confirm Update";
  updateBtn.style.background = "#e67e22";
  updateBtn.style.color = "#fff";
  updateBtn.style.padding = "10px 16px";
  updateBtn.style.marginTop = "10px";
  updateBtn.style.border = "none";
  updateBtn.style.borderRadius = "5px";
  updateBtn.style.cursor = "pointer";

  form.appendChild(updateBtn);

  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const updatedData = {
      title: titleInput.value,
      category: categoryInput.value,
      image: imageInput.value,
      author: authorInput.value,
      content: contentInput.value,
      date: dateInput.value,
    };

    fetch(`https://json-server-5t30.onrender.com/transport/${updateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then(res => res.json())
      .then(() => {
        fetchBlogs();
        form.reset();
        updateId = null;
        updateBtn.remove();
      })
      .catch(err => console.error("Update error:", err));
  });
}

// Initialize
function main() {
  fetchBlogs();
  setupPostHandler();
  setupBlogInteraction();
}

document.addEventListener("DOMContentLoaded", main);
