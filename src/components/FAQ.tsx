interface FAQProps {
  onClose: () => void;
}

export default function FAQ({ onClose }: FAQProps) {
  return (
    <div className="faq">
      <div className="faq__header">
        <h2 className="faq__title">Info</h2>
        <button type="button" className="faq__close-button" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="faq__content">
        <div className="faq__item">
          <h3 className="faq__question">What is this calculator for?</h3>
          <p className="faq__answer">
            Converting your running times and paces into different units on the
            fly. Add whichever data you have and the calculator will display
            your duration, pace distance and speed in kilometers and miles.
          </p>
        </div>

        <div className="faq__item">
          <h3 className="faq__question">What about my data?</h3>
          <p className="faq__answer">
            This app runs completely locally on your device. Nothing is sent
            anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
