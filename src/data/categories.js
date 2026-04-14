import { GiCookie, GiCakeSlice, GiCupcake, GiDonut, GiBalloons } from 'react-icons/gi';
import { LuCroissant, LuDessert } from 'react-icons/lu';
import { FaBaby, FaBirthdayCake, FaTags, FaHeart } from 'react-icons/fa';

export const categories = [
    { id: 1, name: 'Cookies', slug: 'cookies', icon: GiCookie, image: '/categories/cookies.jpg' },
    { id: 2, name: 'Cakes', slug: 'cakes', icon: GiCakeSlice, image: '/categories/cakes.jpg' },
    { id: 3, name: 'Bento Cakes', slug: 'bento-cakes', icon: GiCakeSlice, image: '/bento-cake/bento-cake-3.jpeg' },
    { id: 4, name: 'Pastry', slug: 'pastry', icon: LuCroissant, image: '/categories/pastry.jpg' },
    { id: 5, name: 'Desserts', slug: 'desserts', icon: LuDessert, image: '/categories/desserts.jpg' },
    { id: 6, name: 'Cup Cakes', slug: 'cup-cakes', icon: GiCupcake, image: '/categories/cupcakes.jpg' },
    { id: 7, name: 'Donuts', slug: 'donuts', icon: GiDonut, image: '/categories/donuts.jpg' },
    { id: 8, name: 'Party Items', slug: 'party-items', icon: GiBalloons, image: '/categories/party.jpg' },
    { id: 9, name: 'Baby Cakes', slug: 'baby-cakes', icon: FaBaby, image: '/baby-cake/baby-cake-1.jpeg' },
    { id: 10, name: 'Boys Cakes', slug: 'boys-cakes', icon: FaBirthdayCake, image: '/boys-cakes/boys-cakes-1.jpeg' },
    { id: 11, name: 'Deals', slug: 'deals', icon: FaTags, image: '/deals-2200/deals-2200-1.jpeg' },
    { id: 12, name: 'Nikka Cakes', slug: 'nikka-cakes', icon: FaHeart, image: '/nikka-cake/nikha-cake-1.jpeg' },
    { id: 13, name: 'Pound Cakes', slug: 'pound-cakes', icon: GiCakeSlice, image: 'https://images.unsplash.com/photo-1582760933250-818ce35ea6aa?w=400&h=400&fit=crop' },
];
