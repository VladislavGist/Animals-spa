import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LoginFormComponent from '../src/components/forms/loginForm/loginFormComponent'

storiesOf('loginFormComponent', module)
	.add('default', () => {
		return <LoginFormComponent />
	})
	.add('clicked', () => {
		return <LoginFormComponent onClick={ action('clicked') } />
	})