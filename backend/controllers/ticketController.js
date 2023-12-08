const asyncHandler = require( 'express-async-handler' );

const User = require( '../models/userModel' );
const Ticket = require( '../models/ticketsModel' );



// @desc Get user tickets
// @route GET/api/tickets
// @access Private
const getTickets = asyncHandler( async ( req, res ) =>
{
    // Get user using the id in the JWT
    const user = await User.findById( req.user.id );

    if ( !user )
    {
        res.status( 404 );
        throw new Error( 'User not found' );
    }

    const tickets = await Ticket.find( { user: req.user.id } );

    res.status( 200 ).json( tickets );
} );


// @desc Create new ticket
// @route POST/api/tickets
// @access Private
const createTicket = asyncHandler( async ( req, res ) =>
{
    const { product, description } = req.body;

    if ( !product || !description )
    {
        res.status( 400 );
        throw new Error( 'PLease add a product and a description' );
    }

    // Get user using the id in the JWT
    const user = await User.findById( req.user.id );

    if ( !user )
    {
        res.status( 404 );
        throw new Error( 'User not found' );
    }

    const ticket = await ticket.create( {
        product,
        description,
        user: req.user.id,
        status: 'new',
    } );

    res.status( 201 ).json( ticket );
} );


module.exports = {
    getTickets,
    createTicket,
};