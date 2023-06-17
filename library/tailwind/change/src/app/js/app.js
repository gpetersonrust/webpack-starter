import '../scss/app.scss';
 
const accordionItems = document.querySelectorAll('.site-nav__item');

accordionItems.forEach((item) => {
  const accordionLink = item.querySelector('.site-nav__link');
  const subMenu = item.querySelector('.sub-menu');

  accordionLink.addEventListener('click', (e) => {
    e.preventDefault();
    subMenu.classList.toggle('active');
    if (subMenu.classList.contains('active')) {
      const height = subMenu.getBoundingClientRect().height;
      subMenu.style.maxHeight = `${height}px`;
    } else {
      subMenu.style.maxHeight = null;
    }
  });
});

// Define a class called App
class App {
  // Define a constructor method
  constructor() {
    // DOM
    // Find all elements with data-responsive_trim
    this.responsive_trim_elements = this.map_elements_to_trim(
      document.querySelectorAll('[data-responsive_trim]')
    );

    // Variables
    this.site_navigation = new SiteNavigation();

    this.events_resize = [
      this.site_navigation.restart_submenus.bind(this.site_navigation),
      this.responsive_trim.bind(this),
    ];
    // tailwind breakpoints
    this.breakpoints = {
      mobile: 640,
      tablet: 768,
      desktop: 1280,
    };

    // methods
 
    // Call the init method
    this.init();
  }

  // Define an init method
  init() {
    // Call the events method
    this.events();
    this.responsive_trim();
  }

  // Define an events method
  events() {
    // Add an event listener for the resize event
    window.addEventListener('resize', () => {
      // Loop through the events_resize array and call each function
      this.events_resize.forEach((event) => event());
    });
  }
  /**
   * map trim elements method to a new array of objects
   *  1. loop through each element in the responsive_trim_elements and map it to a new array of objects.
   *  2. textContent as original value.
   *  3. turn data-responsive_trim into an sizes object.
   *  loop through sizes object and add each key and value to the new object.
   * @param {array} elements
   * @returns {array}
   */

  map_elements_to_trim(elements) {
    return [...elements].map((element) => {
      // Get the textContent of the element and assign it to the original_value variable
      let original_value = element.textContent;
      // Turn the data-responsive_trim attribute into an object and assign it to the responsive_trim_data variable
      let responsive_trim_data = JSON.parse(
        element.getAttribute('data-responsive_trim')
      );
      // Create a new object called trim_object
      let trim_object = {
        element
      };
      // Loop through the responsive_trim_data object
      for (let [key, value] of Object.entries(responsive_trim_data)) {
        // Add each key and value to the trim_object
        trim_object[key] = value;
      }
      // Add the original_value to the trim_object
      trim_object.original_value = original_value;
      // Return the trim_object
      return trim_object;
    });
  }

  /**  responsive trim method
     1. loop through each element in the responsive_trim_elements
     2. get the window size
     3. check window size against the breakpoints
     4. Once the appropiate breakpoint is found get the value from the object
       4a. create fall back. if mobile size is found but no mobile value is set, use the tablet value, 
        4b. if tablet size is found but no tablet value is set, use the desktop value,
        4c if desktop size is used return the original value.
      5. trim the text using the trim_text method
      6. replace the textContent of the element with the trimmed text


   */
  responsive_trim() {
    console.log('trim');
    // Loop through each element in the responsive_trim_elements
    this.responsive_trim_elements.forEach((mapped_element) => {
      // Get the window size
      let window_size = window.innerWidth;
      // Check window size against the breakpoints
      let value = mapped_element?.desktop ||   'Original';
      if (window_size < this.breakpoints.desktop)
        value = mapped_element.tablet || value;
      if (window_size < this.breakpoints.tablet)
        value = mapped_element.mobile || value;
      if (window_size < this.breakpoints.mobile)
        value = mapped_element.mobile || value;

   
      // Trim the text using the trim_text method
      let trimmed_text =   value == 'Original' ? mapped_element.original_value :  this.trim_text(mapped_element.original_value, +value);
     
      // Replace the textContent of the mapped_element with the trimmed text
      mapped_element.element.textContent = trimmed_text;
      
    });
  }
  /**
   * trim text method
   * 1. check if the text is longer than the value
   * 2. if it is, trim the text and add the ellipsis
   * 3. if it is not, return the original text
   * @param {string} text
   * @param {number} value
   * @returns {string}
   */
  trim_text(text, value) {
    // Check if the text is longer than the value
    if (text.length > value) {
      text = text.split(" ").slice(0, value).join(" ");

      // Trim the text and add the ellipsis
      return text + '...';
    } else {
      // Return the original text
      return text;
    }
  }
}
 // Define a class called SiteNavigation
class SiteNavigation {
  // Define a constructor method
  constructor() {
    // Get the site-nav element and assign it to the site_navigation property
    this.site_navigation = document.getElementById('site-nav');
    // Get all li elements with a sub-menu child and assign them to the site_navigation_lis_with_children property
    this.site_navigation_lis_with_children = [...this.site_navigation.querySelectorAll('li')].filter(li => li.querySelector('.sub-menu'));
    // Call the init method
    this.init();
  }

  // Define an init method
  init() {
    // Call the events and add_arrow_down_icon methods
    this.events();
    this.add_arrow_down_icon();
  }

  // Define an empty events method
  events() {}

  // Define a method called add_arrow_down_icon
  add_arrow_down_icon() {
    // Loop through each li element with a sub-menu child
    this.site_navigation_lis_with_children.forEach(li => {
      // Get the a element inside the li element
      const a = li.querySelector('a');
      // Create a new i element with the class icon-arrow-down
      const icon = document.createElement('i');
      icon.classList.add('icon-arrow-down');
      // Append the i element to the a element
      a.appendChild(icon);
     

      // Add a click event listener to the i element
      icon.addEventListener('click', (e) => {
        // Get the window size
        let window_size = window.innerWidth;
        // Check if the window size is bigger than 1280
        let bigger_than_1280 = window_size > 1280;
         

        // If the parent of the li element is not main-menu and the window size is bigger than 1280, return
        if (li.parentElement.className == 'main-menu' && bigger_than_1280)
          return;
        e.preventDefault();
        // Toggle the active class on the sub-menu element inside the li element
        li.querySelector('.sub-menu').classList.toggle('active');
        // Based on the active state, change the class of the i element to either icon-arrow-down or icon-arrow-close
        if (li.querySelector('.sub-menu').classList.contains('active')) {
          icon.classList.remove('icon-arrow-down');
          icon.classList.add('icon-close');
        } else {
          icon.classList.remove('icon-close');
          icon.classList.add('icon-arrow-down');
        }
      });
    });
  }

  // Define a method called restart_submenus
  restart_submenus() {
    // Loop through each li element with a sub-menu child
    this.site_navigation_lis_with_children.forEach(li => {
      // Remove the active class from the sub-menu element
      li.querySelector('.sub-menu').classList.remove('active');
      // Replace the class icon-close with icon-arrow-down on the i element
      let i  = li.querySelector('i');
      let i_class = i.className;
      // use ternary operator to check if the i element has the class icon-close
      i_class == 'icon-close' ? i.className = 'icon-arrow-down' : null;

    });
  }
}

new App();
