'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const tagDB = {
        tags: [],
        privat: false,

        get fullPulOfTags() {
            return `${this.tags}`;
          },
        set fullPulOfTags(value) {
            this.tags.push(value);
        },
        get privatStat() {
            return this.privat;
        },
        set privatStat(value) {
            this.privat = value;
        }
    };

    const  addForm = document.querySelector('.bub'),
           addInput = document.querySelector('.main__inp'),
           tagList = document.querySelector('.tag__box'),
           check  = document.querySelector('.checker');
    
    addForm.addEventListener('click', (event) => {
        event.preventDefault();
        let newTag = addInput.value;
        if (newTag && !tagDB.privat) {
            if (newTag.length > 10 ) {
                newTag = `${newTag.substring(0, 10)}...`;
            }
            tagDB.fullPulOfTags = newTag;
            createTagList(tagDB.tags, tagList);
        }
        addInput.value = '';
        
    });

    check.addEventListener('change', () => {
        if (tagDB.privatStat) {
            tagDB.privatStat = false;
         } else {
            tagDB.privatStat = true;
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

    createTagList(tagDB.tags, tagList);
});

