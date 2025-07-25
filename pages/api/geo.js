// pages/api/geo.js

export default async function handler(req, res) {
  // Get IP address; behind proxies, check x-forwarded-for (first IP is the user's real IP)
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;
  console.log("ip:-",ip);

  // If running locally, you'll get ::1 or 127.0.0.1 which is not geolocatable
  // But don't use 8.8.8.8 as a fallback, just return 'localhost' if needed
  if (ip === '::1' || ip === '127.0.0.1') {
    return res.status(200).json({
      ip: ip,
      country: null,
      countryCode: null,
      city: null,
      region: null,
      message: "Cannot geolocate localhost IP. Deploy to production for real geolocation."
    });
  }

  // If the IP is IPv6 mapped (e.g. ::ffff:49.32.123.4), extract IPv4
  if (ip.startsWith('::ffff:')) {
    ip = ip.split(':').pop();
  }

  try {
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await geoRes.json();
    console.log("data:-",data);
    res.status(200).json({
      ip: ip,
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      region: data.regionName,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to geolocate IP", error: error.message });
  }
}