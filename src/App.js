import React, { useState, useEffect } from 'react';

// Main App component for the Duality Dice Roller
function App() {
    // State variables to store the rolls, modifier, total, and messages
    const [hopeRoll, setHopeRoll] = useState(null);
    const [fearRoll, setFearRoll] = useState(null);
    const [modifier, setModifier] = useState('');
    const [totalRoll, setTotalRoll] = useState(null);
    const [mainMessage, setMainMessage] = useState('Roll the dice!'); // Renamed 'message' to 'mainMessage' for clarity
    const [outcomeDisplay, setOutcomeDisplay] = useState(''); // New state for outcome display

    // Function to simulate rolling a D12 (12-sided die)
    const rollD12 = () => {
        return Math.floor(Math.random() * 12) + 1;
    };

    // Function to calculate the total roll including the modifier
    const calculateTotal = (hRoll, fRoll, modVal) => {
        const currentMod = parseInt(modVal, 10) || 0; // Parse modifier, default to 0 if invalid
        return hRoll + fRoll + currentMod;
    };

    // Function to determine the outcome message based on Hope and Fear rolls
    const getOutcomeMessage = (hRoll, fRoll) => {
        if (hRoll === null || fRoll === null) return ''; // No rolls yet
        if (hRoll === fRoll) {
            return "Critical Success!";
        } else if (hRoll > fRoll) {
            return "Success with Hope!";
        } else {
            return "Success with Fear!";
        }
    };

    // Handles a standard dice roll
    const handleRoll = () => {
        const newHopeRoll = rollD12();
        const newFearRoll = rollD12();
        const calculatedTotal = calculateTotal(newHopeRoll, newFearRoll, modifier);
        const outcomeMsg = getOutcomeMessage(newHopeRoll, newFearRoll); // Get outcome message

        setHopeRoll(newHopeRoll);
        setFearRoll(newFearRoll);
        setTotalRoll(calculatedTotal);
        setMainMessage(`You rolled: Hope ${newHopeRoll}, Fear ${newFearRoll}. Total: ${calculatedTotal}.`); // Main message without outcome
        setOutcomeDisplay(outcomeMsg); // Set outcome display separately
    };

    // Handles rolling with Advantage
    const handleAdvantage = () => {
        // Roll two sets of dice
        const roll1Hope = rollD12();
        const roll1Fear = rollD12();
        const total1 = calculateTotal(roll1Hope, roll1Fear, modifier);

        const roll2Hope = rollD12();
        const roll2Fear = rollD12();
        const total2 = calculateTotal(roll2Hope, roll2Fear, modifier);

        let finalHopeRoll, finalFearRoll, finalTotal;

        // Determine which set is higher
        if (total1 >= total2) {
            finalHopeRoll = roll1Hope;
            finalFearRoll = roll1Fear;
            finalTotal = total1;
        } else {
            finalHopeRoll = roll2Hope;
            finalFearRoll = roll2Fear;
            finalTotal = total2;
        }
        const outcomeMsg = getOutcomeMessage(finalHopeRoll, finalFearRoll); // Get outcome message for the kept roll


        setHopeRoll(finalHopeRoll);
        setFearRoll(finalFearRoll);
        setTotalRoll(finalTotal);
        setMainMessage(
            `Advantage Roll!\nSet 1: Hope ${roll1Hope}, Fear ${roll1Fear} (Total: ${total1}).\nSet 2: Hope ${roll2Hope}, Fear ${roll2Fear} (Total: ${total2}).\nKept roll: Hope ${finalHopeRoll}, Fear ${finalFearRoll} (Total: ${finalTotal}).`
        );
        setOutcomeDisplay(outcomeMsg); // Set outcome display separately
    };

    // Handles rolling with Disadvantage
    const handleDisadvantage = () => {
        // Roll two sets of dice
        const roll1Hope = rollD12();
        const roll1Fear = rollD12();
        const total1 = calculateTotal(roll1Hope, roll1Fear, modifier);

        const roll2Hope = rollD12();
        const roll2Fear = rollD12();
        const total2 = calculateTotal(roll2Hope, roll2Fear, modifier);

        let finalHopeRoll, finalFearRoll, finalTotal;

        // Determine which set is lower
        if (total1 <= total2) {
            finalHopeRoll = roll1Hope;
            finalFearRoll = roll1Fear;
            finalTotal = total1;
        } else {
            finalHopeRoll = roll2Hope;
            finalFearRoll = roll2Fear;
            finalTotal = total2;
        }
        const outcomeMsg = getOutcomeMessage(finalHopeRoll, finalFearRoll); // Get outcome message for the kept roll

        setHopeRoll(finalHopeRoll);
        setFearRoll(finalFearRoll);
        setTotalRoll(finalTotal);
        setMainMessage(
            `Disadvantage Roll!\nSet 1: Hope ${roll1Hope}, Fear ${roll1Fear} (Total: ${total1}).\nSet 2: Hope ${roll2Hope}, Fear ${roll2Fear} (Total: ${total2}).\nKept roll: Hope ${finalHopeRoll}, Fear ${finalFearRoll} (Total: ${finalTotal}).`
        );
        setOutcomeDisplay(outcomeMsg); // Set outcome display separately
    };

    // Update total roll whenever hopeRoll, fearRoll, or modifier changes
    // This ensures the displayed total is always correct, especially after modifier changes
    useEffect(() => {
        if (hopeRoll !== null && fearRoll !== null) {
            setTotalRoll(calculateTotal(hopeRoll, fearRoll, modifier));
        }
    }, [hopeRoll, fearRoll, modifier]);


    return (
        <div
            className="min-h-screen bg-purple-50 flex items-center justify-center p-4"
        >
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center border-4 border-purple-300">
                <h1 className="text-4xl font-extrabold mb-6 text-purple-800 tracking-tight">
                    Duality Dice Roller
                </h1>

                {/* Display current rolls if they exist */}
                <div className="flex justify-around mb-8 gap-4">
                    <div className="bg-gradient-to-tr from-blue-400 to-indigo-500 text-white p-6 rounded-xl shadow-lg flex-1">
                        <p className="text-xl font-semibold mb-2">Hope Die</p>
                        <p className="text-5xl font-bold">{hopeRoll !== null ? hopeRoll : '-'}</p>
                    </div>
                    <div className="bg-gradient-to-tr from-orange-400 to-red-500 text-white p-6 rounded-xl shadow-lg flex-1">
                        <p className="text-xl font-semibold mb-2">Fear Die</p>
                        <p className="text-5xl font-bold">{fearRoll !== null ? fearRoll : '-'}</p>
                    </div>
                </div>

                {/* Modifier input field */}
                <div className="mb-8">
                    <label htmlFor="modifier" className="block text-gray-700 text-lg font-medium mb-2">
                        Additional Modifier:
                    </label>
                    <input
                        type="number"
                        id="modifier"
                        className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl font-mono focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                        value={modifier}
                        onChange={(e) => setModifier(e.target.value)}
                        placeholder="e.g., +5 or -3"
                    />
                </div>

                {/* Total Roll display */}
                <div className="mb-8 p-4 bg-purple-100 rounded-xl shadow-inner border border-purple-200">
                    <p className="text-2xl font-bold text-purple-700">Total Roll:</p>
                    <p className="text-6xl font-extrabold text-purple-900 mt-2">
                        {totalRoll !== null ? totalRoll : '0'}
                    </p>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                        onClick={handleRoll}
                        className="w-full bg-gradient-to-r from-indigo-700 to-indigo-900 hover:from-indigo-800 hover:to-indigo-950 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
                    >
                        Roll Dice
                    </button>
                    <button
                        onClick={handleAdvantage}
                        className="w-full bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 flex items-center justify-center"
                    >
                        Advantage
                    </button>
                    <button
                        onClick={handleDisadvantage}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 flex items-center justify-center"
                    >
                        Disadvantage
                    </button>
                </div>

                {/* Message display */}
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-gray-800 text-md">
                    <p className="font-semibold">Result: {outcomeDisplay}</p>
                    <p>
                        {mainMessage.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < mainMessage.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;