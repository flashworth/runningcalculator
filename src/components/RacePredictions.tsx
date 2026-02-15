import type { RacePrediction } from '../types';
import { formatDuration } from '../utils/formatting';
import ToggleSwitch from './ToggleSwitch';

interface RacePredictionsProps {
  predictions: RacePrediction[];
  show: boolean;
  onToggle: (show: boolean) => void;
}

export default function RacePredictions({ predictions, show, onToggle }: RacePredictionsProps) {
  return (
    <section className="race-predictions">
      <div className="race-predictions__header">
        <ToggleSwitch
          id="show-race-predictions"
          label="Show race predictions"
          checked={show}
          onChange={onToggle}
        />
      </div>
      {show && (
        <div className="race-predictions__body">
          {predictions.map((race) => (
            <div key={race.name} className="race-predictions__row">
              <span className="race-predictions__name">{race.name}</span>
              <span className="race-predictions__time">
                {formatDuration(race.durationSeconds)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
