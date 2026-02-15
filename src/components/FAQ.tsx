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
          <h3 className="faq__question">What is this for?</h3>
          <p className="faq__answer">
            If you're like me, you love checking your running pace against your
            goals and common benchmarks. That's what this app's for! Give it a
            pace and a distance, a distance and a time, or a pace and a time,
            and it'll do the rest.
          </p>
        </div>

        <div className="faq__item">
          <h3 className="faq__question">What about my data?</h3>
          <p className="faq__answer">
            This app runs completely locally on your device. Nothing is sent
            anywhere.
          </p>
        </div>
        <div className="faq__item">
          <h3 className="faq__question">What do you mean by "Open"?</h3>
          <p className="faq__answer">
            Open Running Calculator is an open source project hosted on{" "}
            <a href="https://github.com/flashworth/runningcalculator">Github</a>
            . You can take the code and use it, modify it and share it with
            others.
          </p>
        </div>
      </div>
    </div>
  );
}
