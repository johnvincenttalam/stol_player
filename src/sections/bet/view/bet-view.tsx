import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { DashboardContent } from 'src/layouts/dashboard';

import { BackButton } from 'src/components/back-button';


// Styled component for the clickable ball
const BallButton = styled(Paper)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  background:
    'radial-gradient(circle at top left, #FFE86C 0%, #EDC800 55%, #D8B600 85%, #D8B600 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(1.05)',
  },
}));

const AmountButton = styled(Paper)<{ backgroundimage?: string }>(({ theme, backgroundimage }) => ({
  width: 100,
  height: 100,
  borderRadius: '50%',
  background: backgroundimage
    ? `url(${backgroundimage}) center/cover`
    : 'radial-gradient(circle at top left, #FFE86C 0%, #EDC800 55%, #D8B600 85%, #D8B600 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(1.05)',
  },
}));

const DisplayBall = styled(Paper)(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: 'radial-gradient(circle at top left, #FFE86C 0%, #EDC800 55%, #D8B600 85%, #D8B600 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'default',
}));

// Game configuration
const gameConfigs = {
  '2D': {
    name: '2D LOTTO',
    combinations: 2,
    numberRange: { min: 1, max: 31 },
    straightPayout: 40,
    rambolPayout: 10,
    mechanics: {
      description: 'Pick 2 numbers from 1 to 31. Match the exact order (Straight) or any order (Rambol).',
      howToPlay: [
        'Select 2 numbers from 1 to 31',
        'Choose your bet type: Straight or Rambol',
        'Select your bet amount',
        'Confirm your bet'
      ],
      winningCombinations: [
        'Straight: Match the exact order of the winning numbers (1:40 payout)',
        'Rambol: Match the numbers in any order (1:10 payout)'
      ],
      drawSchedule: 'Daily at 2:00 PM, 5:00 PM, and 9:00 PM'
    }
  },
  '3D': {
    name: '3D LOTTO',
    combinations: 3,
    numberRange: { min: 0, max: 9 },
    straightPayout: 450,
    rambolPayout: 40,
    mechanics: {
      description: 'Pick 3 numbers from 0 to 9. Match the exact order (Straight) or any order (Rambol).',
      howToPlay: [
        'Select 3 numbers from 0 to 9',
        'Choose your bet type: Straight or Rambol',
        'Select your bet amount',
        'Confirm your bet'
      ],
      winningCombinations: [
        'Straight: Match the exact order of the winning numbers (1:450 payout)',
        'Rambol: Match the numbers in any order (1:40 payout)'
      ],
      drawSchedule: 'Daily at 11:00 AM, 4:00 PM, and 9:00 PM'
    }
  },
  '4D': {
    name: '4D LOTTO',
    combinations: 4,
    numberRange: { min: 0, max: 9 },
    straightPayout: 3500,
    rambolPayout: 100,
    mechanics: {
      description: 'Pick 4 numbers from 0 to 9. Match the exact order (Straight) or any order (Rambol).',
      howToPlay: [
        'Select 4 numbers from 0 to 9',
        'Choose your bet type: Straight or Rambol',
        'Select your bet amount',
        'Confirm your bet'
      ],
      winningCombinations: [
        'Straight: Match the exact order of the winning numbers (1:3500 payout)',
        'Rambol: Match the numbers in any order (1:100 payout)'
      ],
      drawSchedule: 'Daily at 6:00 PM and 9:00 PM'
    }
  },
  '6D': {
    name: '6D LOTTO',
    combinations: 6,
    numberRange: { min: 0, max: 9 },
    straightPayout: 3500,
    rambolPayout: 100,
    mechanics: {
      description: 'Pick 6 numbers from 0 to 9. Match the exact order (Straight) or any order (Rambol).',
      howToPlay: [
        'Select 6 numbers from 0 to 9',
        'Choose your bet type: Straight or Rambol',
        'Select your bet amount',
        'Confirm your bet'
      ],
      winningCombinations: [
        'Straight: Match the exact order of the winning numbers (1:3500 payout)',
        'Rambol: Match the numbers in any order (1:100 payout)'
      ],
      drawSchedule: 'Daily at 9:00 PM'
    }
  },
};

// ----------------------------------------------------------------------

export function BetView() {
  const { game, province, regioncode, region } = useParams<{
    game: string;
    province: string;
    regioncode: string;
    region: string;
  }>();

  // Determine game type from the game parameter (default to 2D)
  const gameType = game?.toUpperCase().includes('3D') ? '3D' 
                 : game?.toUpperCase().includes('4D') ? '4D'
                 : game?.toUpperCase().includes('6D') ? '6D' 
                 : '2D';
  
  const currentGameConfig = gameConfigs[gameType as keyof typeof gameConfigs];

  const [showSelectionBox, setShowSelectionBox] = useState(false);
  const [showAmountSelectionBox, setShowAmountSelectionBox] = useState(false);
  const [showBetDetails, setShowBetDetails] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showMechanicsDialog, setShowMechanicsDialog] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>(
    new Array(currentGameConfig.combinations).fill('')
  );
  const [straightAmountValue, setStraightAmountValue] = useState<string>('');
  const [rambolAmountValue, setRambolAmountValue] = useState<string>('');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [clickedNumbers, setClickedNumbers] = useState<number[]>([]);
  const [lastClickedNumber, setLastClickedNumber] = useState<number | null>(null);

  const handleTextFieldClick = (fieldIndex: number) => {
    setActiveField(`select${fieldIndex}`);
    setShowSelectionBox(true);
  };

  const handleAmountFieldClick = (fieldId: 'straight_amount' | 'rambol_amount') => {
    setActiveField(fieldId);
    setShowAmountSelectionBox(true);
  };

  const handleBallClick = (ballNumber: number) => {
    setLastClickedNumber(ballNumber);

    // Format number based on game type (2D uses 2 digits, 3D/4D use single digit)
    const numberString = gameType === '2D' 
      ? ballNumber.toString().padStart(2, '0')
      : ballNumber.toString();

    // Put the number in the active field
    if (activeField?.startsWith('select')) {
      const fieldIndex = parseInt(activeField.replace('select', '')) - 1;
      const newSelectedNumbers = [...selectedNumbers];
      newSelectedNumbers[fieldIndex] = numberString;
      setSelectedNumbers(newSelectedNumbers);
    }

    // Hide the selection box and clear active field after selection
    setShowSelectionBox(false);
    setActiveField(null);

    setClickedNumbers((prev) => [...prev, ballNumber]);
  };

  const handleAmountClick = (amount: number) => {
    // Put the amount in the active field
    if (activeField === 'straight_amount') {
      setStraightAmountValue(amount.toString());
    } else if (activeField === 'rambol_amount') {
      setRambolAmountValue(amount.toString());
    }

    // Hide the amount selection box and clear active field after selection
    setShowAmountSelectionBox(false);
    setActiveField(null);
  };

  const handleBetClick = () => {
    // Check if at least one amount is selected
    if (!straightAmountValue && !rambolAmountValue) {
      setShowError(true);
      // Hide error message after 5 seconds
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    // Check if all number combinations are selected
    if (!selectedNumbers.every(num => num !== '')) {
      setShowError(true);
      // Hide error message after 5 seconds
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    setShowError(false);
    setShowBetDetails(true);
  };

  const handleClearList = () => {
    // Clear all form values
    setSelectedNumbers(new Array(currentGameConfig.combinations).fill(''));
    setStraightAmountValue('');
    setRambolAmountValue('');
    
    // Hide all collapse boxes and error
    setShowSelectionBox(false);
    setShowAmountSelectionBox(false);
    setShowBetDetails(false);
    setShowError(false);
    
    // Clear active field and other states
    setActiveField(null);
    setClickedNumbers([]);
    setLastClickedNumber(null);
  };

  const calculatePayout = () => {
    const straightAmount = parseFloat(straightAmountValue) || 0;
    const rambolAmount = parseFloat(rambolAmountValue) || 0;
    const totalBet = straightAmount + rambolAmount;

    // Use dynamic payout ratios from game config
    const straightPayout = straightAmount * currentGameConfig.straightPayout;
    const rambolPayout = rambolAmount * currentGameConfig.rambolPayout;

    return {
      totalBet: totalBet.toFixed(2),
      straightPayout: straightPayout.toFixed(2),
      rambolPayout: rambolPayout.toFixed(2),
      totalPayout: (straightPayout + rambolPayout).toFixed(2),
    };
  };

  return (
    <DashboardContent>
      <BackButton />
      <Typography variant="h4" textTransform="uppercase">
        {regioncode?.toUpperCase()}
      </Typography>
      <Typography variant="body2" color="text.secondary" textTransform="capitalize">
        {region} -{' '}
        {province
          ?.split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </Typography>

      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        mt={3}
        mb={2}
      >
        <Avatar
          src={`/assets/images/games/${gameType}_lotto.png`}
          alt={`${gameType} lotto game`}
          sx={{
            width: 100,
            height: 100,
            borderRadius: 1.2,
          }}
        />
        <Typography variant="h4" textTransform="uppercase" fontWeight={700}>
          {currentGameConfig.name} 3PM
        </Typography>
      </Stack>

      <Typography variant="body1" color="initial" mb={1}>
        Bet Combinations ({currentGameConfig.combinations} numbers)
      </Typography>
      <Stack direction="row" spacing={2} mb={3}>
        {selectedNumbers.map((value, index) => (
          <TextField
            key={`select${index + 1}`}
            id={`select${index + 1}`}
            variant="outlined"
            placeholder="Select"
            fullWidth
            value={value}
            onClick={() => handleTextFieldClick(index + 1)}
            InputProps={{
              readOnly: true,
            }}
            inputProps={{
              style: { textAlign: 'center', fontWeight: 600, cursor: 'pointer' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: activeField === `select${index + 1}` ? 'primary.main' : 'grey.300',
                  borderWidth: activeField === `select${index + 1}` ? 2 : 1,
                },
              },
            }}
          />
        ))}
      </Stack>

      <Collapse in={showSelectionBox} timeout={300}>
        <Box
          sx={{
            mt: 2,
            mb: 3,
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            backgroundColor: 'background.paper',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1" fontWeight={600}>
              Pick your number
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                setShowSelectionBox(false);
                setShowAmountSelectionBox(false);
                setActiveField(null);
              }}
            >
              Close
            </Button>
          </Stack>

          <Box
            sx={{
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>
              <Grid container spacing={2}>
                {Array.from(
                  { length: currentGameConfig.numberRange.max - currentGameConfig.numberRange.min + 1 }, 
                  (_, index) => {
                    const ballNumber = currentGameConfig.numberRange.min + index;

                    return (
                      <Grid size={3} key={ballNumber}>
                        <Box display="flex" justifyContent="center">
                          <BallButton elevation={2} onClick={() => handleBallClick(ballNumber)}>
                            <Typography
                              variant="h3"
                              component="span"
                              sx={{
                                color: '#000',
                                fontWeight: 'bold',
                              }}
                            >
                              {gameType === '2D' 
                                ? ballNumber.toString().padStart(2, '0')
                                : ballNumber.toString()
                              }
                            </Typography>
                          </BallButton>
                        </Box>
                      </Grid>
                    );
                  }
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Collapse>

      <Stack direction="row" spacing={2}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="body1" color="initial" mb={1}>
            Straight Amount
          </Typography>
          <TextField
            id="straight_amount"
            variant="outlined"
            placeholder="Select"
            value={straightAmountValue}
            fullWidth
            onClick={() => handleAmountFieldClick('straight_amount')}
            InputProps={{
              readOnly: true,
            }}
            inputProps={{
              style: { textAlign: 'center', fontWeight: 600, cursor: 'pointer' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: activeField === 'straight_amount' ? 'primary.main' : 'grey.300',
                  borderWidth: activeField === 'straight_amount' ? 2 : 1,
                },
              },
            }}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant="body1" color="initial" mb={1}>
            Rambol Amount
          </Typography>
          <TextField
            id="rambol_amount"
            variant="outlined"
            placeholder="Select"
            value={rambolAmountValue}
            fullWidth
            onClick={() => handleAmountFieldClick('rambol_amount')}
            InputProps={{
              readOnly: true,
            }}
            inputProps={{
              style: { textAlign: 'center', fontWeight: 600, cursor: 'pointer' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: activeField === 'rambol_amount' ? 'primary.main' : 'grey.300',
                  borderWidth: activeField === 'rambol_amount' ? 2 : 1,
                },
              },
            }}
          />
        </Box>
      </Stack>

      <Collapse in={showAmountSelectionBox} timeout={300}>
        <Box
          sx={{
            mt: 2,
            mb: 3,
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            backgroundColor: 'background.paper',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1" fontWeight={600}>
              Select Amount
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                setShowAmountSelectionBox(false);
                setActiveField(null);
              }}
            >
              Close
            </Button>
          </Stack>

          <Box
            sx={{
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>
              <Grid container spacing={2}>
                {[10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 500].map((amount) => {
                  const imagePath = `/assets/images/amounts/${amount}_g_coin.png`;

                  return (
                    <Grid size={4} key={amount}>
                      <Box display="flex" justifyContent="center">
                        <AmountButton
                          onClick={() => handleAmountClick(amount)}
                          backgroundimage={imagePath}
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Collapse>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          className="bg-yellow"
          onClick={handleBetClick}
          sx={{
            color: '#000',
            '&:hover': {
              backgroundColor: '#FFC300',
            },
          }}
        >
          BET
        </Button>
      </Box>

      {showError && (
        <Alert 
          severity="error" 
          variant="outlined"
          sx={{ mt: 2 }}
          onClose={() => setShowError(false)}
        >
          {!straightAmountValue && !rambolAmountValue
            ? 'Please select at least one bet amount (Straight or Rambol) before placing a bet.'
            : `Please select all ${currentGameConfig.combinations} numbers for ${currentGameConfig.name}.`
          }
        </Alert>
      )}

      <Collapse in={showBetDetails} timeout={300}>
        <Box sx={{ mt: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              Bet Details
            </Typography>
          </Stack>

          <Stack spacing={2} mb={3}>
            {/* Straight Bet Card */}
            {straightAmountValue && (
              <Card sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="body1" fontWeight={700}>
                    STRAIGHT BET
                  </Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Draw:
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {currentGameConfig.name} 3PM
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Combination:
                    </Typography>
                    {selectedNumbers.every(num => num !== '') ? (
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        {selectedNumbers.map((number, index) => (
                          <DisplayBall key={index}>
                            <Typography
                              variant="caption"
                              component="span"
                              sx={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                              }}
                            >
                              {number}
                            </Typography>
                          </DisplayBall>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" fontWeight={600}>
                        No combination
                      </Typography>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Bet Amount:
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <img 
                        src="/assets/images/amounts/g_coin.png" 
                        alt="G Coins" 
                        style={{ width: 18, height: 18 }}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        {straightAmountValue}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                     Payout:
                    </Typography>
                    <Typography variant="body1" fontWeight={700} color="success.main">
                      ₱{parseFloat(calculatePayout().straightPayout).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            )}

            {/* Rambol Bet Card */}
            {rambolAmountValue && (
              <Card sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="body1" fontWeight={700}>
                    RAMBOL BET
                  </Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Draw:
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {currentGameConfig.name} 3PM
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Combination:
                    </Typography>
                    {selectedNumbers.every(num => num !== '') ? (
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        {selectedNumbers.map((number, index) => (
                          <DisplayBall key={index} elevation={2}>
                            <Typography
                              variant="caption"
                              component="span"
                              sx={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                              }}
                            >
                              {number}
                            </Typography>
                          </DisplayBall>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" fontWeight={600}>
                        No combination
                      </Typography>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Bet Amount:
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <img 
                        src="/assets/images/amounts/g_coin.png" 
                        alt="G Coins" 
                        style={{ width: 18, height: 18 }}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        {rambolAmountValue}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Payout:
                    </Typography>
                    <Typography variant="body1" fontWeight={700} color="success.main">
                      ₱{parseFloat(calculatePayout().rambolPayout).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button 
              sx={{ gap: 1, borderRadius: '999px' }}
              onClick={() => setShowMechanicsDialog(true)}
            >
              <Icon icon="solar:info-circle-outline" width="18" height="18" />
              <Typography variant="caption" color="initial">
                View game mechanics
              </Typography>
            </Button>
            <Button 
              variant="contained" 
              color="inherit" 
              size="small" 
              sx={{ borderRadius: '999px' }}
              onClick={handleClearList}
            >
              Clear List
            </Button>
          </Stack>
        </Box>
      </Collapse>

      {/* Send Bet Card - Floating on mobile, static on desktop */}
      <Card 
        sx={{ 
          position: { xs: 'fixed', md: 'static' },
          bottom: { xs: 0, md: 'auto' },
          left: { xs: 0, md: 'auto' },
          right: { xs: 0, md: 'auto' },
          transform: 'none',
          width: 'auto',
          p: { xs: 2, sm: 3, md: 2 },
          m: { xs: 0, sm: 0, md: 0 },
          mt: { xs: 1, sm: 2, md: 3 },
          borderRadius: { xs: 2, sm: 3, md: 2 },
          backgroundColor: 'background.paper',
          zIndex: { xs: 1000, md: 'auto' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="body1" color="initial">Total Amount</Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <img 
              src="/assets/images/amounts/g_coin.png" 
              alt="G Coins" 
              style={{ width: 20, height: 20 }}
            />
            <Typography variant="body1" color="initial" fontWeight={900}>
              {calculatePayout().totalBet}
            </Typography>
          </Stack>
        </Stack>
        <Button fullWidth size="large" variant="contained" className="bg-red">
          SEND BET
        </Button>
      </Card>

      {/* Add bottom padding on mobile to prevent content from being hidden behind floating card */}
      <Box sx={{ height: { xs: 60, sm: 80, md: 0 } }} />

      {/* Game Mechanics Dialog */}
      <Dialog
        open={showMechanicsDialog}
        onClose={() => setShowMechanicsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:info-circle-outline" width="24" height="24" />
            <Typography variant="h6" fontWeight={600}>
              {currentGameConfig.name} Game Mechanics
            </Typography>
          </Stack>
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Description */}
            <Box>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {currentGameConfig.mechanics.description}
              </Typography>
            </Box>

            {/* How to Play */}
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                How to Play
              </Typography>
              <Stack spacing={1}>
                {currentGameConfig.mechanics.howToPlay.map((step, index) => (
                  <Stack direction="row" spacing={1} key={index}>
                    <Typography variant="body2" color="primary" fontWeight={600}>
                      {index + 1}.
                    </Typography>
                    <Typography variant="body2">
                      {step}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* Winning Combinations */}
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Winning Combinations
              </Typography>
              <Stack spacing={1}>
                {currentGameConfig.mechanics.winningCombinations.map((combination, index) => (
                  <Stack direction="row" spacing={1} key={index}>
                    <Typography variant="body2" color="success.main" fontWeight={600}>
                      •
                    </Typography>
                    <Typography variant="body2">
                      {combination}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* Draw Schedule */}
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Draw Schedule
              </Typography>
              <Typography variant="body2">
                {currentGameConfig.mechanics.drawSchedule}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={() => setShowMechanicsDialog(false)}
            variant="contained"
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
