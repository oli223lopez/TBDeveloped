import { connect } from 'react-redux'
import ResolvedShow from './question_show'
import { } from '../../actions/question_actions'


const mapStateToProps = (state, ownProps) => ({
    resolved: state.entities.questions[ownProps.match.params.resolvedId]
})



const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolvedShow)