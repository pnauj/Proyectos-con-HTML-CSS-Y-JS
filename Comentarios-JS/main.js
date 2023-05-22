const comments = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
const commentsContainer = document.querySelector("#comment-container");

input.classList.add("input");

input.addEventListener("keydown", (e) => {
  handleEnter(e, null);
});

commentsContainer.appendChild(inputContainer)
inputContainer.appendChild(input)

function handleEnter(e,current){
  if(e.key === 'Enter' && e.target.value !== ''){
    const newComent = {
      text: e.target.value,
      likes: 0,
      responses: []
    }

    if(current === null){
      comments.unshift(newComent)
    } else {
      current.responses.unshift(newComent)
    }

    e.target.value = ''
    commentsContainer.innerHTML = ''
    commentsContainer.appendChild(inputContainer)
    
    console.log(comments);
    renderComments(comments, commentsContainer)
  }
  
}

function renderComments(arr, parent){


}