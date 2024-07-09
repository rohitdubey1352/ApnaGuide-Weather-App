import styled from "styled-components";
import PropTypes from "prop-types";

const Card = styled.div`
  background: linear-gradient(to bottom, #eacda3, #ff9068);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 20px;
  width: 300px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  img {
    margin-top: -1.4rem;
    margin-bottom: -2rem;
  }
  .condition_name {
    font-weight: 600;
  }
`;

const City = styled.h2`
  margin: 0;
`;

const Temp = styled.h3`
  font-size: 6rem;
  margin: 2px 0;
  font-family: roboto;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2px;
`;

const DetailItem = styled.div`
  text-align: center;
`;

const WeatherCard = ({ weather }) => {
  if (!weather || !weather.weather || !weather.weather[0]) return null;

  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <Card>
      <City>{weather.name}</City>
      <Temp>{Math.round(weather.main.temp)}°C</Temp>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p className="condition_name">{weather.weather[0].description}</p>
      <Details>
        <DetailItem>
          <h4>Humidity</h4>
          <p>{weather.main.humidity}%</p>
        </DetailItem>
        <DetailItem>
          <h4>Wind</h4>
          <p>{weather.wind.speed} m/s</p>
        </DetailItem>
        <DetailItem>
          <h4>Pressure</h4>
          <p>{weather.main.pressure} hPa</p>
        </DetailItem>
      </Details>
    </Card>
  );
};

WeatherCard.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default WeatherCard;
