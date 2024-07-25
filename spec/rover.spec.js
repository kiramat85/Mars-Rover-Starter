const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

    // 7 tests here!

    it("constructor sets position and default values for mode and generatorWatts", function() {
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.

        expect(rover.position).toEqual(98382)
        expect(rover.mode).toEqual("NORMAL")
        expect(rover.generatorWatts ).toEqual(110)
    });


//test 8
    it("response returned by receiveMessage contains name of message", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
        expect(response.message).toEqual('Test message with two commands')
    });

//test 9
    it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {

        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);



        expect(response.results.length).toEqual(2)


    });

//test 10
    it("responds correctly to status check command", function() {
        let commands = [new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);




        expect(response.results).toEqual([{
            completed: true,
            roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 98382 }
        }])
    });

//test 11
    it("responds correctly to mode change command", function() {
        let commands = [new Command('MODE_CHANGE', "LOW_POWER")];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);





        expect(rover.mode).toEqual("LOW_POWER")
        expect(response.results).toEqual([{completed: true}])

    });

//test 12
    it("responds with false completed value when attempting to move in LOW_POWER mode", function() {

        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE',65842)];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);






        expect(response.results).toEqual([{completed:true}, {completed: false}])
        expect(rover.position).toEqual(98382)
    });

//test 13
    it("responds with position for move command", function() {

        let commands = [new Command('MOVE', 65842)];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
        expect(rover.position).toEqual(65842)


    });






});

