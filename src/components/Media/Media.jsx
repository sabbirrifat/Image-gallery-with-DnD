import React, { Component } from 'react';
import './media.styles.css';
import MediaCard from '../MediaCard/MediaCard';
import { connect } from 'react-redux';
import { imageChangeButtonsStatus} from '../../redux/media/media-action'
import { clearStates, imageReplaceFrom, replaceImage, selectCard, updateAlert } from '../../redux/canvas/canvas-action';



class Media extends Component {

    constructor() {
        super();
        this.state = {
            replaceImageTarget: null
        }
    }

    updateMediaStatus = (card) => {
        this.setState({ replaceImageTarget: card });
        this.props.imageChangeButtonsStatus(true)
    }

    replaceImageFn = () => {
        const {replaceImageTarget} = this.state;
        const { cardList, updateAlert, replaceImage, clearState, imageChangeButtonsStatus} = this.props;

        if(replaceImageTarget){
                const checkExisting = cardList.find(card => card.char_id === replaceImageTarget.char_id);
            if (checkExisting) {
                updateAlert('This image already exist in the canvas')
            }
            else {
                replaceImage(this.state.replaceImageTarget);
                this.setState({ replaceImageTarget: {} });
                imageChangeButtonsStatus(false);
                clearState()

            }
        }

        else{
            updateAlert('You didn\'t select any image')
        }

        

    }
    cancelImageChange = () => {
        this.setState({ replaceImageTarget: {} });
        this.props.imageChangeButtonsStatus(false)
        this.props.clearState()

    }

    render() {
        const { cards, isCardSelected, isImageChangeButtons } = this.props;
        const { replaceImageTarget } = this.state;
        return (
            <div className="media-container">
                <h2> {isCardSelected ? 'Select an image': 'Media Panel'}</h2>
                {
                    isImageChangeButtons ?
                        <div className="bottom-container">
                            <div className="bottom-buttons">
                                <button onClick={this.replaceImageFn} className="confirm-button">Confirm</button>
                                <button onClick={this.cancelImageChange} className="cancel-button">Cancel</button>
                            </div>
                        </div>
                        : null
                }
                <div className="media-cards-container">
                    {
                        cards?.map((card, key) => (
                            <MediaCard card={card} key={key} isCardSelected={isCardSelected} replaceImageTarget={replaceImageTarget} updateMediaStatus={this.updateMediaStatus} />
                        ))
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({media, canvas}) => ({
    cardList: canvas.cardList,
    isCardSelected: canvas.isCardSelected,
    isImageChangeButtons: media.isImageChangeButtons
})

const mapDispatchToProps = dispatch => ({
    selectCard: () => dispatch(selectCard()),
    replaceImage: (card) => dispatch(replaceImage(card)),
    imageReplaceFrom: (card) => dispatch(imageReplaceFrom(card)),
    imageChangeButtonsStatus: (status) => dispatch(imageChangeButtonsStatus(status)),
    updateAlert: (message) => dispatch(updateAlert(message)),
    clearState: () => dispatch(clearStates())
})

export default connect(mapStateToProps, mapDispatchToProps)(Media)
