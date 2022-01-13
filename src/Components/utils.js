/*
	The price & cost per hour are determined by the following 6 variables
	1- Service: Basic, Standard, Premium
	2- Level: Semi, Pro, Master
	3- Hours: 5, 10, 15, 20, 30, 40, 50
	4- Location: Medellin, Cartagena, Cali, Bogota, Virtual
	5- Venue: Studio, Home
	6- Participant ratio: Number of students / number of instructors
*/

//getPriceAndCostCalculation("basic", "semi", 10, "medellin", "studio", 0);
 export default function getPriceAndCostCalculation(
	serviceType, 
	level,
	hours, 
	location, 
	venue, 
  participantRatio)
{
	
  var baseCost = 40000;
  var basePrice = 60000;
  
  var discountHourPack = getTransformationHourPack(hours);
  [baseCost, basePrice] = applyAmountTransformation(baseCost, basePrice, discountHourPack);
  
  var discountLevel = getLevelTransformation(level);
  [baseCost, basePrice] = applyAmountTransformation(baseCost, basePrice, discountLevel);

  var serviceTypeTransformation = getServiceAmountTransformation(serviceType);
  [baseCost, basePrice] = applyAmountTransformation(baseCost, basePrice, serviceTypeTransformation);

  var locationTransformation = getLocationTransformation(location, venue);
  [baseCost, basePrice] = applyAmountTransformation(baseCost, basePrice, locationTransformation);

  return [baseCost * hours, basePrice * hours];
}

function getTransformationHourPack(hours)
{
  switch (hours) {
    case 10: return { 'ipp' : 0, 'dpp' : 15, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case 15: return { 'ipp' : 0, 'dpp' : 20, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case 20: return { 'ipp' : 0, 'dpp' : 25, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case 25: return { 'ipp' : 0, 'dpp' : 27.5, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
	  case 30: return { 'ipp' : 0, 'dpp' : 30, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case 40: return { 'ipp' : 0, 'dpp' : 32.5, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case 50: return { 'ipp' : 0, 'dpp' : 35, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    default: return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  }
 }

function getLevelTransformation(level)
{
  level = level.toLowerCase();
 	switch (level) {
  	case "semi": return { 'ipp' : 0, 'dpp' : 10, 'ipc' : 0, 'dpc' : 10, 'iap' : 0, 'iac' : 0 };
    case "pro": return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "master": return { 'ipp' : 20, 'dpp' : 0, 'ipc' : 10, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  	default : return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
	}
}

function getServiceAmountTransformation(service)
{
  service = service.toLowerCase();
 	switch (service) {
  	case "basic": return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "standard": return { 'ipp' : 15, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "premium": return { 'ipp' : 30, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  	default : return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
	}
}

function getLocationTransformation(location, venue)
{
  location = location.toLowerCase();
  venue = venue.toLowerCase();
  if(venue === "virtual") { location = "" }
	switch (location + venue) 
  {
  	case "virtual" :        return { 'ipp' : 0, 'dpp' : 25, 'ipc' : 0, 'dpc' : 30, 'iap' : 0, 'iac' : 0 };
  	case "medellinhome" :   return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  	case "medellinstudio" : return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 10000, 'iac' : 10000 };
  	case "bogotahome" :     return { 'ipp' : 20, 'dpp' : 0, 'ipc' : 20, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "bogotastudio" :   return { 'ipp' : 20, 'dpp' : 0, 'ipc' : 20, 'dpc' : 0, 'iap' : 20000, 'iac' : 20000 };
  	case "cartagenahome" :  return { 'ipp' : 10, 'dpp' : 0, 'ipc' : 10, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
	  case "cartagenastudio" :return { 'ipp' : 10, 'dpp' : 0, 'ipc' : 10, 'dpc' : 0, 'iap' : 30000, 'iac' : 30000 };
  	case "calihome" :       return { 'ipp' : 0, 'dpp' : 10, 'ipc' : 0, 'dpc' : 10, 'iap' : 0, 'iac' : 0 };
	  case "calistudio" :     return { 'ipp' : 0, 'dpp' : 10, 'ipc' : 0, 'dpc' : 10, 'iap' : 10000, 'iac' : 10000 };
    default: return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  }
  
}

// function getParticipantRatioDiscount()
// {
//     //TODO  
// }


// function getParticipantRatio(numberOfStudents, numberOfTeachers)
// {
// 	return numberOfStudents / numberOfTeachers;
// }

function applyAmountTransformation(baseCost, basePrice, transformationObject)
{
    //{ 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    if(transformationObject.ipp > 0){
      basePrice += calculatePercentageAmount(basePrice, transformationObject.ipp);
    }

    if(transformationObject.ipc > 0){
      baseCost += calculatePercentageAmount(baseCost, transformationObject.ipc);
    }

    if(transformationObject.dpp > 0)
    {
      basePrice -= calculatePercentageAmount(basePrice, transformationObject.dpp);
    }

    if(transformationObject.dpc > 0)
    {
      baseCost -= calculatePercentageAmount(baseCost, transformationObject.dpc);
    }

    //iap' : 0, 'iac'
    if(transformationObject.iap > 0){
      basePrice += transformationObject.iap;
    } 

    if(transformationObject.iac > 0){
      baseCost +=  transformationObject.iac;
    }

    return [baseCost, basePrice];
}

function calculatePercentageAmount(amount, percentage)
{
	return (amount * percentage) / 100
}

