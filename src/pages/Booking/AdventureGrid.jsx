// AdventureGrid.js
import AdventureCard from "./AdventureCard";
import "../../styles/components/AdventureGrid.css";

export default function AdventureGrid({ adventures, title, showCount }) {
  return (
    <div className="adventure-grid">
      <div className="adventure-grid-header">
        <h3 className="adventure-grid-title">{title}</h3>
        {showCount && (
          <div className="adventure-grid-count">
            Showing {adventures.length} adventures
          </div>
        )}
      </div>
      <div className="adventure-grid-list">
        {adventures.map((adventure) => (
          <AdventureCard key={adventure.id} adventure={adventure} layout="grid" />
        ))}
      </div>
    </div>
  );
}
