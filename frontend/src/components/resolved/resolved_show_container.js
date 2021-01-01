import { connect } from 'react-redux'
import ResolvedShow from './resolved_show'
import {fetchQuestion } from '../../actions/questions_actions'
// import { } from '../../actions/question_actions'


const mapStateToProps = (state, ownProps) => {
    let resolved = {}
    // console.log(ownProps.match.params.resolvedId)
    if (Object.keys(state.entities.questions).length > 0) {
        resolved[ownProps.match.params.resolvedId] = state.entities.questions[ownProps.match.params.resolvedId]
    }
    // console.log(ownProps.match.params.resolvedId)
    return ({
        resolvedId: ownProps.match.params.resolvedId,
        resolved,
        userId: state.session.user
    })

}



const mapDispatchToProps = (dispatch) => ({
    fetchQuestion: (questionId) => dispatch(fetchQuestion(questionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolvedShow)