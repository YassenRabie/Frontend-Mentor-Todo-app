const body = document.querySelector('body')
const itemsContainer = document.querySelector('.items')
const newItemInput = document.querySelector('#new-item-input')
const newItemStatebox = document.querySelector('#new-item-statebox')
const itemsCount = document.querySelector('#items-count')
const themeButton = document.querySelector('#theme-button')

const filterButtonAll = document.querySelector('#filter-all')
const filterButtonActive = document.querySelector('#filter-active')
const filterButtonCompleted = document.querySelector('#filter-completed')

let items = []
let i = 0
let itemsFilter = "all"
let darkTheme = false

const moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>'

const sunSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>'

function switchTheme() {
   body.classList.toggle("dark")
   darkTheme = !darkTheme
   themeButton.innerHTML = darkTheme ? sunSVG : moonSVG
}

// Add new Item
function addItem(e) {
   e.preventDefault()
   const newItem = {
      id: i,
      text: newItemInput.value,
      completed: newItemStatebox.checked
   }
   items = [...items, newItem]
   i++

   renderItems()
}


function toggleCompleted(id) {
   items.map(item => {
      if (item.id === id) {
         item.completed = !item.completed
      }
   })
   renderItems()
}

function deleteItem(id) {
   let newItems = items.filter(item => {
      return item.id !== id
   })

   items = newItems
   renderItems()
}

function clearCompleted(e) {
   e.preventDefault()
   let newItems = items.filter(item => {
      return item.completed === false
   })

   items = newItems
   renderItems()
}

function setFilter(state) {
   itemsFilter = state
   renderItems()

   console.log(state)
   if (state === "all") {
      filterButtonAll.className = "active-filter"
   } else {
      filterButtonAll.className = ""
   }

   if (state === "active") {
      filterButtonActive.className = "active-filter"
   } else {
      filterButtonActive.className = ""
   }

   if (state === "completed") {
      console.log('test')
      filterButtonCompleted.className = "active-filter"
   } else {
      filterButtonCompleted.className = ""
   }


}

// Render all items in items array
function renderItems() {
   itemsContainer.innerHTML = ""
   items.map(element => {
      if (itemsFilter == "completed" && !element.completed) {
         console.log('print completed!')
         return
      } else if (itemsFilter == "active" && element.completed) {
         console.log('print active!')
         return
      }
      var item = document.createElement('div')
      item.className = 'item'
      item.id = element.id

      // Create and Add completed checkbox
      var stateBox = document.createElement('input')
      stateBox.type = "checkbox"
      stateBox.checked = element.completed
      stateBox.addEventListener('change', () => {
         toggleCompleted(element.id)
      })

      // Create and Add delete item button
      var deleteButton = document.createElement('button')
      deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>'
      deleteButton.className = "delete-button"
      deleteButton.addEventListener('click', () => {
         deleteItem(element.id)
      })

      // Create and Add item text
      var text = document.createElement('span')
      text.innerHTML = element.text
      element.completed ? text.className = "completed" : ""

      // Add item to items container
      item.appendChild(stateBox)
      item.appendChild(text)
      item.appendChild(deleteButton)

      itemsContainer.appendChild(item)
   })

   // Number of items that not completed
   let itemsLeft = 0
   items.map(element => {
      if (!element.completed) {
         itemsLeft++
      }
   })
   itemsCount.innerHTML = `${itemsLeft} items left`
}