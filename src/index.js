import { registerFormatType, toggleFormat, applyFormat, removeFormat } from '@wordpress/rich-text';
import { BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { compose, ifCondition } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Popover, Button, TextareaControl, Toolbar, ToolbarButton } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { comment } from '@wordpress/icons';
import './editor.scss';

const TooltipButton = (props) => {
	const { isActive, value, onChange, activeAttributes } = props;
	const onToggle = () => {
		onChange(
			toggleFormat( value, {
				type: 'tooltips/add-tooltip',
			})
		);
	}
	const onImageRemove = (e, tooltipText) => {
		e.stopPropagation();
		const newVal = applyFormat(
			value,
			{
				type: 'tooltips/add-tooltip',
				attributes: {
					'data-timage': '',
					'data-timageurl': '',
					'data-tooltip': tooltipText
				}
			}
		);
		onChange( newVal );
	}
	const onTextareaChange = (text, activeAttributes) => {
		const timage = activeAttributes['data-timage'] ? activeAttributes['data-timage'] : '';
		const timageurl = activeAttributes['data-timageurl'] ? activeAttributes['data-timageurl'] : '';
		const newVal = applyFormat(
			value,
			{
				type: 'tooltips/add-tooltip',
				attributes: {
					'data-timage': timage,
					'data-timageurl': timageurl,
					'data-tooltip': text,
					'style': 'border-bottom: 1px dashed'
				}
			}
		);
		onChange( newVal );
	}

	return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							icon={ comment }
							label={ isActive ? __('Remove Tooltip', 'g-tooltips') : __('Add Tooltip', 'g-tooltips') }
							onClick={ onToggle }
							isPressed={ isActive }
						/>
					</Toolbar>
					{ isActive &&
					<Popover
						position='bottom center'
						className='g-tooltips-popover'
						// OnClose is not firing for Popover, do not know why.
						onClose={ () => {
							console.log('close');
						} }
					>
						<h3>{ __('Add Tooltip Text', 'g-tooltips') }</h3>
						<TextareaControl
							value={ activeAttributes['data-tooltip'] ? activeAttributes['data-tooltip'] : '' }
							onChange={ (text) => { onTextareaChange(text, activeAttributes) } }
						/>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={ ['image'] }
								render={ ({ open }) => (
									<Button
										isSecondary={ ! activeAttributes['data-timage'] }
										className={ activeAttributes['data-timage'] ? 'g-tooltips-image__toggle' : 'g-tooltips-image__preview'}
										onClick={ open }
									>
										{ activeAttributes['data-timage'] &&
										<Fragment>
											<div className="g-tooltips-image__wrapper">
												<img className='g-tooltips-image' src={ activeAttributes['data-timageurl'] } alt="" />
												<button
													type="button"
													className="g-tooltips-image__remove dashicons-before dashicons-no-alt"
													onClick={ e => onImageRemove(e, activeAttributes['data-tooltip']) }
												>
												</button>
											</div>
										</Fragment>
										}
										{ ! activeAttributes['data-timage'] && __('Choose an image (optional)', 'g-tooltips') }
									</Button>
								) }
								onSelect={ image => {
									const tooltipText = activeAttributes['data-tooltip'] ? activeAttributes['data-tooltip'] : '';
									const newVal = applyFormat(
										value,
										{
											type: 'tooltips/add-tooltip',
											attributes: {
												'data-timage': image.id.toString(),
												'data-timageurl': image.url,
												'data-tooltip': tooltipText,
												'style': 'border-bottom: 1px dashed'
											}
										}
									);
									onChange( newVal );
								} }
							/>
						</MediaUploadCheck>
					</Popover> }
				</BlockControls>
			</Fragment>
		)
};

const ConditionalButton = compose(
	withSelect( function(select) {
		return {
			selectedBlock: select('core/editor').getSelectedBlock()
		}
	} ),
	ifCondition( function(props) {
		return (
			props.selectedBlock &&
			props.selectedBlock.name === 'core/paragraph'
		);
	} )
)(TooltipButton);

registerFormatType(
	'tooltips/add-tooltip', {
		title: 'Add Tooltip',
		tagName: 'span',
		className: 'g-tooltip',
		edit: ConditionalButton,
		attributes: {
			'data-timage': 'data-timage',
			'data-timageurl': 'data-timageurl',
			'data-tooltip': 'data-tooltip',
			'style': 'style'
		}
	}
);
