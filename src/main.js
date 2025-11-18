import { dropdownMenu } from './dropdown.js';
import { navigateSlides } from './navigateSlides.js';

// Per Odin Assignment: Modularized dropdown menu to handle multiple buttons
dropdownMenu.handleDropdown('exploreBtn');
dropdownMenu.handleDropdown('membershipBtn');
dropdownMenu.handleDropdown('aboutBtn');

// Image Carousel Handler
navigateSlides.init();
