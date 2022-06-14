'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const tagDB = {
        tags: [],
        add: true,

        get fullPulOfTags() {
            return this.tags;
          },
        set fullPulOfTags(value) {
            this.tags.push(value);
        },
        get privatStat() {
            return this.add;
        },
        set privatStat(value) {
            this.add = value;
        },

        clearTags() {
            this.tags = [];
        },

        togleAddstatus(){
            this.add = !this.add;
        }
    };
    
  
    const  addForm = document.querySelector('#bub1'),
           delForm = document.querySelector('#bub2'),
           locate = document.querySelector('#bub3'),
           addInput = document.querySelector('.main__inp'),
           tagList = document.querySelector('.tag__box'),
           check  = document.querySelector('.checker');
    
    if (localStorage.getItem('isChecked') === 'false') {
        check.checked = true;
        tagDB.privatStat = false;
    }
        
    if (localStorage.getItem('localList')) {
        console.log(localStorage.getItem('localList'));

        localStorage.getItem('localList').split(',').forEach((item) => {
            tagDB.fullPulOfTags = item;
        });
    }

    addForm.addEventListener('click', (event) => {
        event.preventDefault();
        let newTag = addInput.value;
        if (newTag && tagDB.privatStat) {
            if (newTag.length > 10 ) {
                newTag = `${newTag.substring(0, 10)}...`;
            }
            tagDB.fullPulOfTags = newTag;
            createTagList(tagDB.tags, tagList);
        }
        addInput.value = ''; 
    });

    delForm.addEventListener('click', (event) => {
        event.preventDefault();
        tagDB.clearTags();
        createTagList(tagDB.tags, tagList);
        localStorage.removeItem('localList')
    });

    check.addEventListener('change', () => {
        if (tagDB.privatStat) {
            tagDB.togleAddstatus();
            localStorage.setItem('isChecked', false);
         } else {
            tagDB.togleAddstatus();
            localStorage.setItem('isChecked', true);
        }
    });

    function createTagList(tags, parent) {
        parent.innerHTML = "";
        tags.forEach((tag) => {
            parent.innerHTML += `         
                <div class="tag">
                    <div class="tag__name">
                        ${tag}
                    </div>
                    <img src="icons/x.png" alt="Del" class="tag__del">
                </div>
            `;
        });

        document.querySelectorAll('.tag__del').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                tagDB.tags.splice(i, 1);
                createTagList(tags, parent);
            });
        });
    }
    locate.addEventListener('click', () => {
        localStorage.setItem('localList', tagDB.fullPulOfTags);
    })

    createTagList(tagDB.tags, tagList);
});

