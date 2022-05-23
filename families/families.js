import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';
    // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
    for (let family of families) {
        // your HTML Element should look like this:
        // <div class="family">
        const familyDiv = document.createElement('div');
        familyDiv.classList.add('family');
        //    <h3>the Garcia family</h3>
        // put the family name in the name element
        const h3 = document.createElement('h3');
        h3.textContent = family.name;
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        const bunniesDiv = document.createElement('div');
        bunniesDiv.classList.add('bunnies');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        //    </div>
        // </div>

        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            //    make an element with the css class 'bunny', and put the bunny's name in the text content
            const bunnyDiv = document.createElement('div');
            bunnyDiv.classList.add('bunny');
            bunnyDiv.textContent = bunny.name;
            //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            bunnyDiv.addEventListener('click', async () => {
                await deleteBunny();
                await getFamilies();
            });
            // append this bunnyEl to the bunniesEl
            bunniesDiv.append(bunnyDiv);
        }
        // append the bunniesEl and nameEl to the familyEl
        // append the familyEl to the familiesEl
        familyDiv.append(bunniesDiv, h3);
        familiesEl.append(familyDiv);

    }
    



}

displayFamilies();



