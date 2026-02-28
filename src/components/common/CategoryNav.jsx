import { Link } from 'react-router-dom';
import './CategoryNav.css';

const CategoryNav = ({ categories }) => {
    // Default categories if none provided
    const defaultCategories = [
        {
            id: 1,
            name: 'Apple',
            image: './categories/apple.png',
            slug: 'Apple'
        },
        {
            id: 2,
            name: 'Samsung',
            image: './categories/samsung.png',
            slug: 'Samsung'
        },
        {
            id: 3,
            name: 'Honor',
            image: './categories/honor.avif',
            slug: 'Honor'
        },
        {
            id: 4,
            name: 'Google Pixel',
            image: '/categories/pixel.jpeg',
            slug: 'Google Pixel'
        },
        {
            id: 5,
            name: 'Gaming',
            image: './categories/apple.png',
            slug: 'gaming'
        },
        {
            id: 6,
            name: 'Audio',
            image: './categories/apple.png',
            slug: 'audio'
        },
        {
            id: 7,
            name: 'Audio',
            image: './categories/apple.png',
            slug: 'audio'
        }
    ];

    const displayCategories = categories || defaultCategories;

    return (
        <section className="category-nav">
            <div className="container mx-auto px-4">
                <div className="category-nav__grid">
                    {displayCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/shop?categoryId=${category.id}`}
                            className="category-nav__item"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="category-nav__image"
                            />
                            <p className="category-nav__name">{category.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryNav;
