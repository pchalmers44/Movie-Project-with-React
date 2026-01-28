import React from "react";
import "./Skeleton.css";

const Skeleton = ({ type, count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "movie-card":
        return (
          <div className="movie-card skeleton">
            <div className="skeleton-img"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-year"></div>
          </div>
        );
      case "movie-details":
        return (
          <div className="movie-details-container skeleton">
            <div className="skeleton-poster"></div>
            <div className="movie-info">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text long"></div>
            </div>
          </div>
        );
      case "hero":
        return (
          <div className="hero skeleton-hero">
            <div className="skeleton-banner"></div>
            <div className="skeleton-search-bar"></div>
          </div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <React.Fragment key={idx}>{renderSkeleton()}</React.Fragment>
        ))}
    </>
  );
};

export default Skeleton;
