import {fetchQuestions} from '../../actions/questions_actions'
// import {} from ''
import {connect} from 'react-redux'
import BulletinBoard from './bulletin_board'


const mapStateToProps = (state) => {
    console.log(state.entities)
    return({questions: state.entities.questions})
}


const mapDispatchToProps = dispatch =>({
    fetchQuestions: () => dispatch(fetchQuestions())
})


export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoard)