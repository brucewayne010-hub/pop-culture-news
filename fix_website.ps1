Write-Host "🚀 Starting automatic deployment..."
git add .
git commit -m "Final fix validation"
git push
Write-Host "✅ Done! Code pushed to GitHub."
Write-Host "⏳ Please wait 3-5 minutes for Netlify to finish."
Write-Host "👉 Then visit: https://peopleofculture.netlify.app/api/cron/fetch-news"
Start-Sleep -Seconds 20
