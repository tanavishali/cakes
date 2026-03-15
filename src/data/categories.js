import { GiCookie, GiCakeSlice, GiSlicedBread, GiCupcake, GiDonut, GiBalloons } from 'react-icons/gi';
import { LuCroissant, LuDessert } from 'react-icons/lu';

export const categories = [
    { id: 1, name: 'Cookies', icon: GiCookie, image: '/categories/cookies.jpg' },
    { id: 2, name: 'Cakes', icon: GiCakeSlice, image: '/categories/cakes.jpg' },
    { id: 3, name: 'Breads', icon: GiSlicedBread, image: '/categories/breads.jpg' },
    { id: 4, name: 'Pastry', icon: LuCroissant, image: '/categories/pastry.jpg' },
    { id: 5, name: 'Desserts', icon: LuDessert, image: '/categories/desserts.jpg' },
    { id: 6, name: 'Cup Cakes', icon: GiCupcake, image: '/categories/cupcakes.jpg' },
    { id: 7, name: 'Donuts', icon: GiDonut, image: '/categories/donuts.jpg' },
    { id: 8, name: 'Party Items', icon: GiBalloons, image: '/categories/party.jpg' },
];
