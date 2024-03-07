import "./modal.css";
import { useEffect, useState } from 'react';
import { FoodData } from '../../interface/FoodData';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
}

interface ModalProps {
    closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    );
};

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, status } = useFoodDataMutate(); // Modifique aqui

    const submit = () => {
        const foodData: FoodData = {
            title, 
            price,
            image
        };
        mutate(foodData);
    };

    useEffect(() => {
        if (isSuccess) closeModal();
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle} />
                    <Input label="price" value={price} updateValue={setPrice} />
                    <Input label="image" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {status === 'pending' ? 'sending...' : 'send'}
                </button>
            </div>
        </div>
    );
}