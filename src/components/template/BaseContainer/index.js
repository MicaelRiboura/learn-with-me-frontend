import './styles.css';

export default function BaseContainer({ children }) {
    return (
        <div className="base-container">{children}</div>
    );
}