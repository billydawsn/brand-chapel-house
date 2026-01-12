# Deployment Checklist

Use this checklist before deploying your brand guidelines to production.

## Pre-Deployment

### Content
- [ ] Replace sample data in `public/data.json` with your brand information
- [ ] Update brand name, description, and website
- [ ] Set correct `updatedAt` date
- [ ] Add real logo files to `public/assets/logos/`
- [ ] Add real gallery images to `public/assets/gallery/`
- [ ] Verify all asset paths start with `/assets/`
- [ ] Test all asset references load correctly

### Colors
- [ ] Update hex color values
- [ ] Add RGB values (optional but recommended)
- [ ] Add CMYK values for print (optional)
- [ ] Add Pantone values if applicable (optional)
- [ ] Verify color contrast meets WCAG standards

### Typography
- [ ] Configure Google Fonts or upload custom fonts
- [ ] Verify font weights are available
- [ ] Update typography examples with real content
- [ ] Test font loading in dev environment

### Gallery
- [ ] Replace placeholder images with real photos
- [ ] Optimize images for web (recommended: < 500KB each)
- [ ] Add descriptive captions
- [ ] Verify image aspect ratios work in grid

## Testing

### Local Testing
- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` without errors
- [ ] Test on http://localhost:5173 (or 5174)
- [ ] Verify all sections display correctly
- [ ] Test logo download functionality
- [ ] Test color value copy functionality
- [ ] Test gallery lightbox
- [ ] Test mobile navigation

### Build Testing
- [ ] Run `npm run build` successfully
- [ ] No TypeScript compilation errors
- [ ] No build warnings (except expected Tailwind CSS ones)
- [ ] Run `npm run preview` to test production build
- [ ] Verify assets load from preview server

### Browser Testing
- [ ] Test in Chrome/Edge
- [ ] Test in Firefox
- [ ] Test in Safari (macOS/iOS)
- [ ] Test mobile responsiveness
- [ ] Test tablet breakpoints
- [ ] Test keyboard navigation (Tab, Esc, Enter)

### Functionality Testing
- [ ] All logos display correctly
- [ ] Logo download buttons work
- [ ] Color values copy to clipboard with toast
- [ ] WCAG contrast ratios display correctly
- [ ] Fonts load and display properly
- [ ] Typography examples render correctly
- [ ] Gallery images load and open in lightbox
- [ ] Navigation menu works on mobile
- [ ] Smooth scrolling to sections works
- [ ] No console errors in browser DevTools

## GitHub Setup

### Repository
- [ ] Create GitHub repository
- [ ] Push code to `main` branch
- [ ] Add repository description
- [ ] Add topics/tags for discoverability
- [ ] Update repository settings

### GitHub Pages
- [ ] Go to Settings → Pages
- [ ] Set Source to "GitHub Actions"
- [ ] Wait for first deployment to complete
- [ ] Visit deployed URL to verify

### GitHub Actions
- [ ] Verify `.github/workflows/deploy.yml` exists
- [ ] Check Actions tab for workflow runs
- [ ] Verify build succeeds
- [ ] Check deployment succeeds
- [ ] Review any warnings or errors

## Post-Deployment

### Verification
- [ ] Visit your GitHub Pages URL
- [ ] Test all functionality on live site
- [ ] Verify assets load correctly with base path
- [ ] Check mobile responsiveness on live site
- [ ] Test in different browsers
- [ ] Share link with team for review

### Documentation
- [ ] Update README.md with your repo URL
- [ ] Add screenshots to README (optional)
- [ ] Document any customizations made
- [ ] Update PROJECT_SUMMARY.md if needed

### Maintenance
- [ ] Set up process for updating `data.json`
- [ ] Document asset upload workflow
- [ ] Plan for periodic updates
- [ ] Set calendar reminder for `updatedAt` field

## Optional Enhancements

### SEO & Meta
- [ ] Update `index.html` title tag
- [ ] Add meta description
- [ ] Add Open Graph tags for social sharing
- [ ] Add favicon

### Analytics
- [ ] Add Google Analytics (optional)
- [ ] Add other tracking if needed

### Performance
- [ ] Optimize images (WebP format)
- [ ] Lazy load gallery images
- [ ] Add loading states
- [ ] Consider CDN for assets

### Accessibility
- [ ] Run Lighthouse audit
- [ ] Test with screen reader
- [ ] Verify color contrast
- [ ] Check keyboard navigation

## Common Issues & Solutions

### Issue: Assets not loading
**Solution**: Verify all paths in `data.json` start with `/assets/`

### Issue: 404 on GitHub Pages
**Solution**: Check that `VITE_BASE` is set correctly in GitHub Actions

### Issue: Fonts not loading
**Solution**: Check Google Fonts API or verify WOFF2 files are in `public/assets/fonts/`

### Issue: Build fails
**Solution**: Check for TypeScript errors with `npm run build`

### Issue: Colors look wrong
**Solution**: Verify hex values are correct, use # prefix

### Issue: Gallery images too large
**Solution**: Optimize images to < 500KB each using tools like TinyPNG

## Support Resources

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **shadcn/ui**: https://ui.shadcn.com/
- **Zod Validation**: https://zod.dev/
- **GitHub Pages**: https://docs.github.com/en/pages

## Next Steps

1. Complete all checklist items
2. Deploy to GitHub Pages
3. Share with stakeholders
4. Gather feedback
5. Iterate and improve

---

**Remember**: Always test locally before deploying!
