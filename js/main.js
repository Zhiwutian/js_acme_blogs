const createElemWithText = (elem = "p", text = "", className) => {
  const element = document.createElement(elem);
  element.textContent = text;
  if(className){
    element.classList.add(className);
  }
  return element;
}

const createSelectOptions = jsonData => {
  if(!jsonData) return;
  const optionArray = jsonData.map(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name
    return option;
  })
  return optionArray;
}

const toggleCommentSection = postId => {
  if(!postId) return;
  const sections = document.querySelectorAll('section');
  for (const element of sections){
    if(Number(element.getAttribute('data-post-id'))){
      if(Number(element.getAttribute('data-post-id')) === postId){
        element.classList.toggle('hide');
        return element;
      }
    }
  }
  return null;
}

const toggleCommentButton = postId => {
  if(!postId) return;
  if(!document.querySelector(`[data-post-id="${postId}"]`)) {
    return null;
  }
  const button = document.querySelector(`[data-post-id="${postId}"]`);
  button.textContent === "Show Comments" ? button.textContent = "Hide Comments" : button.textContent = "Show Comments";
  return button;
}

const deleteChildElements = parentElement => {
  if(!(parentElement instanceof Element)) return;

  let child = parentElement.lastElementChild;
  while(child){
    parentElement.removeChild(child);
    child = parentElement.lastElementChild
  }
  return parentElement;
}

const addButtonListeners = () => {
  const buttons = document.querySelectorAll('main button');
  if(buttons.length) {
    for(const button of buttons){
      const postId = button.dataset.postId;
      button.addEventListener('click', event => {
      toggleComments(event, postId);
      })
    }
  }
  return buttons;
}

const removeButtonListeners = () => {
  const buttons = document.querySelectorAll('main button');
  if(buttons.length){
    for (const button of buttons){
      const postId = button.dataset.postId;
      button.removeEventListener('click', event => {
        toggleComments(event, postId);
      });
    }
  }
  return buttons;
}

const createComments = jsonComments => {
  if(!jsonComments) return;
  const docFrag = document.createDocumentFragment();
  for (const comment of jsonComments){
    const article = document.createElement('article');
    const h3 = createElemWithText('h3', comment.name);
    const p1 = createElemWithText('p', comment.body);
    const p2 = createElemWithText('p', `From: ${comment.email}`);
    article.append(h3, p1, p2);
    docFrag.append(article);
  }
  return docFrag
}

const populateSelectMenu = jsonData => {
  if(!jsonData) return;
  const selectMenu = document.getElementById('selectMenu');
  const optionArray = createSelectOptions(jsonData);
  for (const option of optionArray){
    selectMenu.append(option);
  }
  return selectMenu;
}

const getUsers = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!res.ok) throw new Error('Status code not in 200 - 299 range');

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

const getUserPosts = async userId => {
  if(!userId) return;
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if(!res.ok) throw new Error('Status code not in 200 - 299 range');
    return await res.json();
  } catch {
    console.error(err);
  }
}

const getUser = async userId => {
  if(!userId) return;
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if(!res.ok) throw new Error('Status code not in 200 - 299 range');
    return await res.json();
  } catch {
    console.error(err);
  }
}

const getPostComments = async postId => {
  if(!postId) return;
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if(!res.ok) throw new Error('Status code not in 200 - 299 range');
    return await res.json();
  } catch {
    console.error(err);
  }
}
const toggleComments = (event, postId) => {
  return true;
}
