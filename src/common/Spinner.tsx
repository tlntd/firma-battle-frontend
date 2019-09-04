import React from 'react';
import MDSpinner from 'react-md-spinner';

type Options = {
  size: number,
  color1: string,
  color2: string,
  color3: string,
  color4: string
}

type SpinnerProps = {
  options?: Options,
  additionalClasses?: string
};

const defaultOptions = {
  size: 32,
  color1: '#07f9a5',
  color2: '#f488ff',
  color3: '#07f9a5',
  color4: '#ffd231'
};

const HomePanel: React.FC<SpinnerProps> = ({options, additionalClasses}) => {
  let classNames: string = 'Spinner';

  if (additionalClasses) {
    classNames += ' ' + additionalClasses;
  }

  return (
    <div className={classNames}>
      <MDSpinner {...{...defaultOptions, options}} />
    </div>
  )
};

export default HomePanel;
